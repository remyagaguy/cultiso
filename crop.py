from PIL import Image
import sys

def crop_transparent(image_path, output_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    
    # Get the bounding box of the non-transparent alpha channel
    bbox = img.getbbox()
    
    if bbox:
        # Crop the image to the bounding box
        img_cropped = img.crop(bbox)
        # Resize it back to square if needed, or just save it
        # Favicons should ideally be square. Let's make it a square by padding if necessary,
        # but first let's see its dimensions.
        width, height = img_cropped.size
        max_dim = max(width, height)
        
        # Create a new square image with transparent background
        new_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
        
        # Paste the cropped image in the center
        paste_x = (max_dim - width) // 2
        paste_y = (max_dim - height) // 2
        new_img.paste(img_cropped, (paste_x, paste_y))
        
        # Save it
        new_img.save(output_path, format="PNG")
        print(f"Successfully cropped and squared. Old size: {img.size}, New size: {new_img.size}")
    else:
        print("Image is entirely transparent.")

crop_transparent('src/app/icon.png', 'src/app/icon.png')
