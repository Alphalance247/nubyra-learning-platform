export const getFileIcon = (file: File): string => {
    const type = file.type;
    const extension = file.name.split('.').pop()?.toLowerCase();
  
    if (type.startsWith('image/')) {
      return URL.createObjectURL(file); // Show thumbnail preview
    }
  
    if (extension === 'pdf') {
      return 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg';
    }
  
    if (['doc', 'docx'].includes(extension!)) {
      return 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Microsoft_Word_2013_logo.svg';
    }
  
    if (['xls', 'xlsx'].includes(extension!)) {
      return 'https://upload.wikimedia.org/wikipedia/commons/7/73/Microsoft_Excel_2013_logo.svg';
    }
  
    if (['zip', 'rar'].includes(extension!)) {
      return 'https://upload.wikimedia.org/wikipedia/commons/8/87/Archive-format-icon.svg';
    }
  
    return 'https://upload.wikimedia.org/wikipedia/commons/8/87/File_icon.svg'; // Generic file icon
  };
  