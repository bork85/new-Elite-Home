import app from "./app";

const PORT:number = Number(process.env.PORT);

app.listen({port: PORT}, () => {
    console.log('✅ Server is running on port '+ PORT);
})