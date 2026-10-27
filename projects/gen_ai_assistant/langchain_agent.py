import os
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.prompts import PromptTemplate

class MultiModalAssistant:
    def __init__(self, api_key: str, faiss_index_path: str = "dataset/faiss_index"):
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=api_key
        )
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0.2,
            google_api_key=api_key
        )
        self.vector_store = FAISS.load_local(
            faiss_index_path, 
            self.embeddings, 
            allow_dangerous_deserialization=True
        )
        self._build_qa_chain()

    def _build_qa_chain(self):
        template = """You are an expert AI & Data Science assistant. Use the following context to answer:
Context: {context}
User Query: {question}

Provide an accurate, grounded, and concise technical answer with citations when applicable."""
        prompt = PromptTemplate(template=template, input_variables=["context", "question"])
        self.chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_store.as_retriever(search_kwargs={"k": 4}),
            chain_type_kwargs={"prompt": prompt}
        )

    def query(self, question: str) -> dict:
        result = self.chain.invoke({"query": question})
        return {
            "answer": result.get("result"),
            "source_documents": [doc.page_content for doc in result.get("source_documents", [])]
        }