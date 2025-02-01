from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import torch
import os
from transformers import T5Tokenizer, T5ForConditionalGeneration, pipeline
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from PyPDF2 import PdfReader

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model and tokenizer
checkpoint = "LaMini-Flan-T5-248M"
offload_folder = "./offload_weights"
os.makedirs(offload_folder, exist_ok=True)

tokenizer = T5Tokenizer.from_pretrained(checkpoint)
base_model = T5ForConditionalGeneration.from_pretrained(
    checkpoint,
    device_map="auto",
    torch_dtype=torch.float16,
    offload_folder=offload_folder,
)

# Preprocess file
def preprocess_file(file_path):
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
    texts = text_splitter.split_documents(pages)
    final_text = ''.join([text.page_content for text in texts])
    return final_text

# Extract original text from PDF
def extract_text_from_pdf(file_path):
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting text: {e}")
        return "Failed to extract text from the PDF."
    
# Summarization
def summarize_document(file_path):
    summarization_pipeline = pipeline(
        'summarization',
        model=base_model,
        tokenizer=tokenizer,
        max_length=500,
        min_length=50
    )
    input_text = preprocess_file(file_path)
    summary = summarization_pipeline(input_text)
    original_text= extract_text_from_pdf(file_path)
    return original_text, summary[0]['summary_text']



# FastAPI route
@app.post("/summarize/")
async def summarize(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        file_location = f"temp_files/{file.filename}"
        os.makedirs("temp_files", exist_ok=True)
        with open(file_location, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Summarize the document
        original_text, summary_text = summarize_document(file_location)

        # Clean up the file
        os.remove(file_location)

        return {
            "originalContent": original_text,
            "summary": summary_text
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"error": str(e)}, 500
