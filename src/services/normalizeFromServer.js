const fromServer = (dataFromServer) => {
  return {
    title: dataFromServer.title,
    description: dataFromServer.description,
    category: dataFromServer.category,
    rating: dataFromServer.rating,
    discount: dataFromServer.discount,
    price: dataFromServer.price,
    trailer: dataFromServer.trailer,
    url: dataFromServer.image.url,
    alt: dataFromServer.image.alt,
  };
};
export { fromServer };
