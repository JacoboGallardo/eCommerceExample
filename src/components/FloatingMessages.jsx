import React from "react";
import { Snackbar, IconButton, Box, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function FloatingMessages({ messages, removeMessage }) {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 20,
                right: 20,
                zIndex: 1400,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}
        >
            {messages.map((msg, index) => (
                <Snackbar
                    key={msg.id}
                    open={true}
                    message={msg.text}
                    autoHideDuration={8000}
                    TransitionComponent={Slide}
                    anchorOrigin={{ vertical: "down", horizontal: "right" }}
                    sx={{
                        transform: `translateY(-${index * 60}px)`, // Moves each message down
                        transition: "transform 0.3s ease-in-out",
                    }}
                    action={
                        <IconButton
                            size="small"
                            color="inherit"
                            onClick={() => removeMessage(msg.id)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            ))}
        </Box>
    );
}

export default FloatingMessages;
