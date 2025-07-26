function initProducts() {
    // Product search functionality
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.getAttribute('data-name').toLowerCase();
                const productDesc = card.getAttribute('data-description').toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }

    // Bulk actions
    const bulkCheckbox = document.getElementById('selectAll');
    const itemCheckboxes = document.querySelectorAll('.product-checkbox');
    const bulkActions = document.getElementById('bulkActions');
    
    if (bulkCheckbox && itemCheckboxes.length) {
        bulkCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            itemCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            toggleBulkActions();
        });

        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                bulkCheckbox.checked = [...itemCheckboxes].every(cb => cb.checked);
                toggleBulkActions();
            });
        });
        
        function toggleBulkActions() {
            const anyChecked = [...itemCheckboxes].some(cb => cb.checked);
            if (anyChecked) {
                bulkActions.classList.remove('hidden');
            } else {
                bulkActions.classList.add('hidden');
            }
        }
    }

    // Product category filtering
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }

    // Initialize product sorting
    const sortSelect = document.getElementById('productSort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const container = document.querySelector('.products-container');
            const products = Array.from(document.querySelectorAll('.product-card'));
            
            products.sort((a, b) => {
                const aValue = a.getAttribute(`data-${e.target.value}`);
                const bValue = b.getAttribute(`data-${e.target.value}`);
                
                if (e.target.value.includes('price') || e.target.value.includes('stock')) {
                    return parseFloat(aValue) - parseFloat(bValue);
                } else if (e.target.value.includes('rating')) {
                    return parseFloat(bValue) - parseFloat(aValue);
                } else {
                    return aValue.localeCompare(bValue);
                }
            });
            
            // Re-append sorted products
            container.innerHTML = '';
            products.forEach(product => container.appendChild(product));
        });
    }

    // Initialize product add/edit modals
    const productModal = document.getElementById('productModal');
    if (productModal) {
        const openModalBtns = document.querySelectorAll('.open-product-modal');
        const closeModalBtn = document.querySelector('.close-product-modal');
        
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const isEdit = btn.hasAttribute('data-product-id');
                
                if (isEdit) {
                    const productId = btn.getAttribute('data-product-id');
                    // In a real app, we would fetch product data here
                    document.getElementById('modalTitle').textContent = 'Edit Product';
                    document.getElementById('productId').value = productId;
                    
                    // Sample data for demo
                    document.getElementById('productName').value = 'Industrial Motor 5HP';
                    document.getElementById('productCategory').value = 'machinery';
                    document.getElementById('productDescription').value = 'High performance industrial motor with 5HP capacity';
                    document.getElementById('productPrice').value = '23450';
                    document.getElementById('productStock').value = '42';
                    document.getElementById('productMOQ').value = '5';
                } else {
                    document.getElementById('modalTitle').textContent = 'Add New Product';
                    document.getElementById('productForm').reset();
                }
                
                productModal.classList.remove('hidden');
            });
        });
        
        closeModalBtn.addEventListener('click', () => {
            productModal.classList.add('hidden');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.classList.add('hidden');
            }
        });
    }
}

if (typeof initProducts === 'function') {
    document.addEventListener('DOMContentLoaded', initProducts);
}

