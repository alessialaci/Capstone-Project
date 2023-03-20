package it.epicode.alessialacitignola.app.config;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {
	
	// Questo metodo serve a salvare la copia di un file su una cartella
	// 1. Recupera la path di una data cartella
	// 2. Se la cartella non esiste, la crea con quel percorso
	// 3. Aggiunge alla path della cartella creata il nome del file passato (/fileName)
	// 4. Fa la copia dei byte da un inputStream al percorso del file
	
	// Metodo per salvare il file su una cartella
    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
    	// 1
    	Path uploadPath = Paths.get(uploadDir);

        // 2
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
        	// 3
            Path filePath = uploadPath.resolve(fileName);

            // 4
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }
    }

}
