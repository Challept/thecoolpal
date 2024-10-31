window.onload = function() {
    fetch('availableproducts.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <p>${product.price}</p>
                    <p>${product.description}</p>
                `;
                productCard.onclick = () => productCard.classList.toggle('selected');
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error loading products:', error));
};
