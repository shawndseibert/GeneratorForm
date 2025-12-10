// Drag and Drop functionality for modules and door configurations

let draggedElement = null;
let draggedType = null; // 'module' or 'door'

// Initialize drag and drop
function initDragAndDrop() {
    // Delegate dragstart for modules
    document.addEventListener('dragstart', function(e) {
        const module = e.target.closest('.form-section-compact');
        const door = e.target.closest('.door-config-card');
        
        if (module && module.draggable) {
            draggedElement = module;
            draggedType = 'module';
            module.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        } else if (door && door.draggable) {
            draggedElement = door;
            draggedType = 'door';
            door.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        }
    });
    
    document.addEventListener('dragend', function(e) {
        if (draggedElement) {
            draggedElement.classList.remove('dragging');
            draggedElement = null;
            draggedType = null;
        }
        // Remove all drag-over classes
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });
    
    // Delegate dragover for drop zones
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        const target = e.target.closest(draggedType === 'module' ? '.form-section-compact' : '.door-config-card');
        
        if (target && target !== draggedElement) {
            target.classList.add('drag-over');
        }
    });
    
    document.addEventListener('dragleave', function(e) {
        const target = e.target.closest(draggedType === 'module' ? '.form-section-compact' : '.door-config-card');
        if (target) {
            target.classList.remove('drag-over');
        }
    });
    
    // Delegate drop
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        
        if (!draggedElement) return;
        
        const target = e.target.closest(draggedType === 'module' ? '.form-section-compact' : '.door-config-card');
        
        if (target && target !== draggedElement && draggedElement.parentNode === target.parentNode) {
            const allItems = Array.from(draggedElement.parentNode.children);
            const draggedIndex = allItems.indexOf(draggedElement);
            const targetIndex = allItems.indexOf(target);
            
            if (draggedIndex < targetIndex) {
                target.parentNode.insertBefore(draggedElement, target.nextSibling);
            } else {
                target.parentNode.insertBefore(draggedElement, target);
            }
            
            // Update module order in doorModules Map if reordering modules
            if (draggedType === 'module') {
                const doorCard = draggedElement.closest('.door-config-card');
                const doorId = doorCard.dataset.doorId;
                updateModuleOrder(doorId);
            }
            
            autoGenerateQuote();
        }
        
        // Remove drag-over class
        if (target) {
            target.classList.remove('drag-over');
        }
    });
}

// Update module order in the doorModules Map
function updateModuleOrder(doorId) {
    const doorCard = document.querySelector(`.door-config-card[data-door-id="${doorId}"]`);
    if (!doorCard) return;
    
    const modules = doorCard.querySelectorAll('.form-section-compact[data-module-id]');
    const newOrder = new Set();
    
    modules.forEach(module => {
        newOrder.add(module.dataset.moduleId);
    });
    
    doorModules.set(doorId, newOrder);
}

// Make door configs draggable
function enableDoorDragging() {
    document.querySelectorAll('.door-config-card').forEach(card => {
        card.setAttribute('draggable', 'true');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
});
