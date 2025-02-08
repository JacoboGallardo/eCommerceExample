import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { AccountCircle, Home } from "@mui/icons-material";

function WelcomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        const userName = localStorage.getItem("userName");
        setIsAuthenticated(!!userToken);
        setUsername(userName);
    }, []);

    const ownerInfo = (
        <Box mt={2}>
            <Typography variant="h6" gutterBottom>
                Sobre el propietario
            </Typography>
            <Typography variant="body1" paragraph>
                Carlos Limiñana es un pintor local con más de 10 años de experiencia en el mundo del arte. Nacido y criado en Gran Canaria, España, Carlos ha perfeccionado su arte en los mejores lugares del mundo. Su pasión por la pintura es evidente en cada una de sus obras, que capturan la esencia de su entorno y de la naturaleza humana. Con una mirada única, su trabajo refleja una profunda conexión con su cultura local y su continuo deseo de explorar nuevas formas de expresión artística.
            </Typography>
            <Typography variant="body1" paragraph>
                A lo largo de los años, Carlos ha desarrollado un enfoque innovador que lo ha llevado a colaborar con artistas internacionales y a ser reconocido por su habilidad para fusionar técnicas clásicas con elementos contemporáneos. Su compromiso con el arte y la comunidad local es inquebrantable, siendo una de las figuras más respetadas en el ámbito artístico de la región.
            </Typography>
            <Typography variant="body1">
                Además de su impresionante trayectoria, Carlos es una persona accesible y generosa, siempre dispuesto a compartir su conocimiento y a inspirar a las nuevas generaciones de artistas.
            </Typography>
        </Box>
    );

    if (isAuthenticated) {
        return (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                    <AccountCircle /> Bienvenido, {username}
                </Typography>
                <Typography variant="body1" paragraph>
                    ¡Es un placer tenerte con nosotros! Explora nuestras obras y disfruta de la experiencia artística única que Carlos Limiñana ha creado.
                </Typography>
                {ownerInfo}
            </Box>
        );
    }

    return (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
            <Typography variant="h4" color="secondary" gutterBottom>
                <Home /> No estás autenticado
            </Typography>
            <Typography variant="body1" paragraph>
                Para acceder a contenido exclusivo, por favor inicia sesión con tu cuenta.
            </Typography>
        </Box>
    );
}

export default WelcomePage;
