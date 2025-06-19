import os
from PIL import Image
import glob

def optimize_image(image_path, quality=85):
    """Optimize an image and create a WebP version."""
    try:
        # Open image
        img = Image.open(image_path)
        
        # Get original format
        original_format = img.format
        
        # Create output paths
        filename = os.path.splitext(image_path)[0]
        optimized_path = f"{filename}.{original_format.lower()}"
        webp_path = f"{filename}.webp"
        
        # Save optimized original format
        img.save(optimized_path, 
                original_format,
                quality=quality, 
                optimize=True)
        
        # Save WebP version
        img.save(webp_path, 
                'WEBP',
                quality=quality, 
                optimize=True)
        
        print(f"Optimized: {image_path}")
        print(f"Created WebP: {webp_path}")
        
    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")

def process_directory(directory):
    """Process all images in a directory and its subdirectories."""
    # Get all image files
    image_patterns = ['*.jpg', '*.jpeg', '*.png']
    image_files = []
    
    for pattern in image_patterns:
        image_files.extend(glob.glob(os.path.join(directory, '**', pattern), recursive=True))
    
    print(f"Found {len(image_files)} images to process")
    
    # Process each image
    for image_path in image_files:
        optimize_image(image_path)

if __name__ == "__main__":
    # Process images in the public/images directory
    image_dir = os.path.join('public', 'images')
    process_directory(image_dir) 