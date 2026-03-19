// 加载商品数据
let products = [];

// 从JSON文件加载商品数据
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        products = await response.json();
        displayProducts(products);
        populateCategories(products);
    } catch (error) {
        console.error('加载商品数据失败:', error);
    }
}

// 显示商品
function displayProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="text-muted small mb-2">${product.category}</p>
                        <p class="card-text flex-grow-1">${product.description.substring(0, 60)}...</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="h5 text-primary">¥${product.price.toFixed(2)}</span>
                                <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary btn-sm">查看详情</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += productCard;
    });
}

// 填充分类筛选
function populateCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    const filter = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });
}

// 搜索和筛选功能
document.getElementById('searchInput').addEventListener('input', function(e) {
    filterProducts();
});

document.getElementById('categoryFilter').addEventListener('change', function(e) {
    filterProducts();
});

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayProducts(filtered);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', loadProducts);
