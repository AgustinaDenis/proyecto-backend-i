//vamos a configurar la variable _dirname con la ruta absoluta de nuestro servidor (que se utiliza para identificar el dorectorio actual del modulo, es la ruta absoluta del server.js)
import { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default __dirname;
