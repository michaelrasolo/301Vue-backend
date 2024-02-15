router.get("/", (req, res) => {
res.status(200).json({message:"✅ Backend up and running"})
});