from PIL import Image
import os

def optimize_image(input_path, output_path, max_width=1920):
    with Image.open(input_path) as img:
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1])
            img = background
        
        # Calculate new height maintaining aspect ratio
        width_percent = (max_width / float(img.size[0]))
        new_height = int((float(img.size[1]) * float(width_percent)))
        
        # Only resize if image is larger than max_width
        if img.size[0] > max_width:
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Save with optimized settings
        img.save(output_path, 'JPEG', quality=80, optimize=True)

if __name__ == "__main__":
    # Define the image mappings
    image_mappings = {
        "public/images/Omgeving/Villajoyosa.jpeg": "public/images/Omgeving/villajoyosa_colorful_houses.jpg"
    }
    
    # Process each image
    for input_path, output_path in image_mappings.items():
        if os.path.exists(input_path):
            print(f"Optimizing {input_path} -> {output_path}")
            optimize_image(input_path, output_path)
            print(f"Optimization complete for {output_path}")
        else:
            print(f"Warning: {input_path} not found") 