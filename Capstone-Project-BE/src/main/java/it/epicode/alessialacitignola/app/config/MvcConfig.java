package it.epicode.alessialacitignola.app.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
	
	// Questo metodo serve a costruire il percorso della risorsa per poter visualizzare i file sul browser
	// 1. Recupera la path della cartella img-utente
	// 2. Recupera la path di un dato file
	// 3. Se la path della cartella inizia con "../", quest'ultimo viene sostituito con una stringa vuota
	// 4. Mette insieme tutte le path recuperate prima

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String dirName = "img-utente";
        
        // 1
        Path uploadDir = Paths.get(dirName);
        
        // 2
        String uploadPath = uploadDir.toFile().getAbsolutePath();
        
        // 3
        if (dirName.startsWith("../")) dirName = dirName.replace("../", "");
        
        // 4
        registry.addResourceHandler("/" + dirName + "/**").addResourceLocations("file:/"+ uploadPath + "/");
    }

}
