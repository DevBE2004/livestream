export const getComponentName = (element: any) => {
  if (element && element.type) {
    if (typeof element.type === "function") {
      return element.type.name || "Unknown Component";
    }
    return element.type;
  }
  return null;
};
