import torch
from PIL import Image
import torchvision.transforms as transforms
from cnn_model import DigitRecognitionCNN

def load_inference_model(weights_path: str = "digit_model.pt"):
    model = DigitRecognitionCNN()
    # In production, load state_dict:
    # model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu')))
    model.eval()
    return model

def predict_digit(image: Image.Image, model: DigitRecognitionCNN) -> int:
    transform = transforms.Compose([
        transforms.Grayscale(num_output_channels=1),
        transforms.Resize((28, 28)),
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])
    
    tensor_img = transform(image).unsqueeze(0)
    with torch.no_grad():
        output = model(tensor_img)
        prediction = output.argmax(dim=1, keepdim=True).item()
    return prediction

if __name__ == "__main__":
    model = load_inference_model()
    test_img = Image.new('L', (28, 28), color=255)
    pred = predict_digit(test_img, model)
    print(f"Inference complete. Predicted digit class: {pred}")
