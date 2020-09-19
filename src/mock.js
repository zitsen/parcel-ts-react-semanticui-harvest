export default function fetchProducts() {
    return new Promise(resolve => {
      return resolve([
        {
          id: 1,
          category: "Sporting Goods",
          price: "$19.99",
          inStock: true,
          name: "Hockey Puck",
          imageUrl: "via.placeholder.com/400x400.png?text=Hockey+Puck"
        },
        {
          id: 2,
          category: "Sporting Goods",
          price: "$9.99",
          inStock: true,
          name: "Baseball",
          imageUrl: "via.placeholder.com/400x400.png?text=Baseball"
        },
        {
          id: 3,
          category: "Sporting Goods",
          price: "$29.99",
          inStock: false,
          name: "Basketball",
          imageUrl: "via.placeholder.com/400x400.png?text=Basketball"
        },
        {
          id: 4,
          category: "Electronics",
          price: "$199.99",
          inStock: true,
          name: "iPod Touch",
          imageUrl: "via.placeholder.com/400x400.png?text=iPod+Touch"
        },
        {
          id: 5,
          category: "Electronics",
          price: "$399.99",
          inStock: false,
          name: "iPhone 6",
          imageUrl: "via.placeholder.com/400x400.png?text=iPhone+5"
        },
        {
          id: 6,
          category: "Electronics",
          price: "$799.99",
          inStock: true,
          name: "Galaxy S20",
          imageUrl: "via.placeholder.com/400x400.png?text=Nexus+7"
        },
        {
          id: 7,
          category: "Electronics",
          price: "$5999.99",
          inStock: true,
          name: "Mac Pro",
          imageUrl: "via.placeholder.com/400x400.png?text=Mac+Pro"
        },
        {
          id: 8,
          category: "Clothing",
          price: "$99.99",
          inStock: true,
          name: "Lattice Jacket",
          imageUrl: "via.placeholder.com/400x400.png?text=Lattice+Jacket"
        }
      ]);
    });
  }