window.onload = function() {
    fetch('availableproducts.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product'); // Ändrat till 'product'
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" style="width: 100%; height: auto; border-radius: 8px;">
                    <h4>${product.title}</h4>
                    <p class="price">${product.price}</p>
                    <p>${product.description}</p>
                `;
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error loading products:', error));
};
