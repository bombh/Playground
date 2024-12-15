export const deepClone = (obj) => {
   //return JSON.parse(JSON.stringify(array))
   if (Array.isArray(obj)) {
      return obj.map((item) => deepClone(item))
   } else if (typeof obj === "object") {
      return { ...obj }
   } else {
      return obj
   }
}
