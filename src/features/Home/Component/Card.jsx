import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActions,
} from "@mui/material";
import React from "react";

const BasicCard= React.memo(({ item }) => {
    const {
        firstName = "",
        lastName = "",
        image = "",
        company = {},
        age = 0,
        height = 0,
    } = item || {};

    return (
    <Card
    sx={{
        width: "100%",
        height: 450,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
        },
    }}
>
    <CardMedia
        component="img"
        image={image}
        alt={firstName}
        sx={{
            height: 220,
            width: "100%",
            objectFit: "cover",
        }}
    />

    <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
            {firstName  +' ' + lastName}
        </Typography>

        <Typography
            variant="body2"
            color="text.secondary"
         
        >
            <strong> {company?.department}</strong>
        </Typography>
           <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                mb: 2,
            }}
        >
            <strong> {company?.title}</strong>
        </Typography>

        <Typography variant="body2">
            Age: {age}
        </Typography>

        <Typography variant="body2">
            Height: {height}
        </Typography>
    </CardContent>

    <CardActions sx={{ p: 2 }}>
        <Button variant="contained" fullWidth>
            View Profile
        </Button>
    </CardActions>
</Card>
    );
})
export default BasicCard