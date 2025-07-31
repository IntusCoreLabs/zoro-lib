export default funciton ZoroCathError(promise) {
  try {
    const data = await promise
    return [data, null]
    
  }catch (err) {
     return [null, err]
  }
}
