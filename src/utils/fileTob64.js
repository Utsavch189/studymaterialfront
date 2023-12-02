export const FileToBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return reader

}