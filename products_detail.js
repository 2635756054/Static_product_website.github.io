// 获取URL中的商品ID
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// 加载商品详情
async function loadProductDetail() {
    const productId = getProductIdFromUrl();
    
    if (!productId) {
        document.getElementById('productDetail').innerHTML = '<p class="text-danger">商品不存在</p>';
        return;
    }
    
    try {
        const response = await fetch('../data/products.json');
        const products = await response.json();
        const product = products.find(p => p.id === productId);
        
        if (product) {
            displayProductDetail(product);
        } else {
            document.getElementById('productDetail').innerHTML = '<p class="text-danger">商品不存在</p>';
        }
    } catch (error) {
        console.error('加载商品详情失败:', error);
    }
}

// 显示商品详情
function displayProductDetail(product) {
    const detailDiv = document.getElementById('productDetail');
    
    const imagesHtml = product.images.map(img => 
        `<div class="col-3"><img src="${img}" class="img-thumbnail" style="cursor:pointer" onclick="viewImage('${img}')"></div>`
    ).join('');
    
    const specsHtml = Object.entries(product.specifications || {}).map(([key, value]) => 
        `<tr><th>${key}</th><td>${value}</td></tr>`
    ).join('');
    
    detailDiv.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="sticky-top" style="top: 20px;">
                    <img id="mainImage" src="${product.images[0]}" class="img-fluid rounded mb-3" alt="${product.name}">
                    <div class="row g-2">
                        ${imagesHtml}
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h1 class="mb-3">${product.name}</h1>
                <div class="d-flex align-items-center mb-3">
                    <span class="h2 text-primary me-3">¥${product.price.toFixed(2)}</span>
                    <span class="badge bg-secondary">${product.category}</span>
                </div>
                
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">商品描述</h5>
                        <p class="card-text">${product.description}</p>
                    </div>
                </div>
                
                ${specsHtml ? `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">规格参数</h5>
                        <table class="table">
                            <tbody>${specsHtml}</tbody>
                        </table>
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;
}

// 查看大图
function viewImage(src) {
    document.getElementById('mainImage').src = src;
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', loadProductDetail);