const FileType = (filename) => {
    const extension = filename.split('.')[1].toLowerCase()
    const file_types = [
        "image",
        "video",
        "pdf",
        "document",
        "excel",
        "powerpoint",
        "text"
    ]

    const image_file_extensions = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']
    const video_file_extensions = ['mp4', 'mov', 'wmv', 'avi', 'mkv']
    const pdf_file_extensions = ['pdf']
    const docx_file_extensions = ['docx']
    const ppt_file_extensions = ['ppt', 'pptx', 'pptm']
    const xlsx_file_extensions = ['xlsx', 'csv', 'xlsm', 'xlsb', 'xltx', 'xls']
    const txt_file_extensions = ['txt']

    if (image_file_extensions.includes(extension)) {
        return file_types[0]
    } else if (video_file_extensions.includes(extension)) {
        return file_types[1]
    } else if (pdf_file_extensions.includes(extension)) {
        return file_types[2]
    } else if (docx_file_extensions.includes(extension)) {
        return file_types[3]
    } else if (ppt_file_extensions.includes(extension)) {
        return file_types[4]
    } else if (xlsx_file_extensions.includes(extension)) {
        return file_types[5]
    } else if (txt_file_extensions.includes(extension)) {
        return file_types[6]
    }
}