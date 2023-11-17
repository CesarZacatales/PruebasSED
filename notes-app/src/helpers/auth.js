export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("SIIII")
    console.log(req.isAuthenticated());
    return next();
  }
  req.flash("error_msg", "Not Authorized.");
  res.redirect("/auth/signin");
  console.log("no")
};
