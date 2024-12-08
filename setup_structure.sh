#!/bin/bash

# Crear directorios necesarios
mkdir -p ./vendor
mkdir -p ./blocks
mkdir -p ./pages

# Crear archivos en el directorio ./vendor
touch ./vendor/normalize.css
touch ./vendor/fonts.css

# Crear archivos en el directorio ./blocks
touch ./blocks/page.css
touch ./blocks/header.css
touch ./blocks/profile.css
touch ./blocks/content.css
touch ./blocks/footer.css
touch ./blocks/form.css

# Crear y escribir en el archivo ./pages/index.css
cat <<EOL > ./pages/index.css
@import url("../vendor/normalize.css");
@import url("../vendor/fonts.css");
@import url("../blocks/page.css");
@import url("../blocks/header.css");
@import url("../blocks/profile.css");
@import url("../blocks/content.css");
@import url("../blocks/footer.css");
@import url("../blocks/form.css");
EOL

# Confirmar creación
echo "Estructura de directorios y archivos creada exitosamente."
