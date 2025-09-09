export default function asyncWrapper(controllerFunc) {
  return (req, res, next) => {
    console.log("i am in async wrapper");
    controllerFunc(req, res, next).catch((err) => {
      next(err);
    })
  }
}