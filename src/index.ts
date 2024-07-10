import app from './app';

const PORT = process.env.PORT || 7594;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
