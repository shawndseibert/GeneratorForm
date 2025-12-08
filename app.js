// Default options for all categories
const defaultOptions = {
    doorConfig: [
        'Slab Only',
        'Pre-hung (with jamb)',
        'Complete Unit (slab, jamb, hardware)',
        'Door + Frame',
        'Replacement Slab'
    ],
    doorType: [
        'Interior Door',
        'Exterior Door',
        'Exterior Entry Door',
        'French Door',
        'Sliding Door',
        'Bi-Fold Door',
        'Pocket Door',
        'Dutch Door',
        'Panel Door'
    ],
    doorMaterial: [
        'Wood - Oak',
        'Wood - Maple',
        'Wood - Cherry',
        'Wood - Mahogany',
        'MDF',
        'Steel',
        'Fiberglass - Smooth',
        'Fiberglass - Textured',
        'Aluminum',
        'UPVC',
        'Composite'
    ],
    doorSize: [
        "3'0\"x6'8\" (36\"x80\")",
        "2'8\"x6'8\" (32\"x80\")",
        "2'6\"x6'8\" (30\"x80\")",
        "2'4\"x6'8\" (28\"x80\")",
        "2'0\"x6'8\" (24\"x80\")",
        "3'0\"x7'0\" (36\"x84\")",
        "6'0\"x6'8\" (72\"x80\")",
        "5'0\"x6'8\" (60\"x80\")"
    ],
    doorThickness: [
        '1-3/8"',
        '1-3/4"',
        '2"',
        '2-1/4"'
    ],
    doorStyle: [
        'Flush',
        'Panel - 2 Panel',
        'Panel - 4 Panel',
        'Panel - 6 Panel',
        '5-Lite Horizontal',
        '5-Lite Vertical',
        '9-Lite',
        '15-Lite',
        'Glass - Full',
        'Glass - Half',
        'Glass - 3/4',
        'Louver',
        'Craftsman',
        'Mission',
        'Contemporary',
        'Traditional',
        'Shaker'
    ],
    glassType: [
        'None',
        'Clear Tempered',
        'Clear',
        'Frosted',
        'Obscured',
        'Low-E',
        'Decorative',
        'Privacy Glass',
        'Insulated Glass Unit (IGU)'
    ],
    handingSwing: [
        'Right-Hand Inswing (RHI)',
        'Left-Hand Inswing (LHI)',
        'Right-Hand Outswing (RHO)',
        'Left-Hand Outswing (LHO)'
    ],
    jambDepth: [
        '4-9/16"',
        '5-1/4"',
        '6-9/16"',
        '6-3/4"',
        '7-1/4"'
    ],
    hingeSize: [
        '3-1/2" x 3-1/2"',
        '4" x 4"',
        '4-1/2" x 4-1/2"',
        '5" x 5"'
    ],
    hingeStyle: [
        'Square Corner',
        'Round Corner',
        'Radius Corner',
        'Ball Bearing',
        'Plain Bearing',
        'Spring Hinge'
    ],
    hingeColor: [
        'Black',
        'Oil Rubbed Bronze',
        'Satin Nickel',
        'Brushed Nickel',
        'Polished Chrome',
        'Antique Brass',
        'Brass',
        'White',
        'Primer'
    ],
    lockBore: [
        '2-1/8"',
        '1-1/2"',
        '2-3/8"'
    ],
    backset: [
        '2-3/4"',
        '2-3/8"',
        '5"'
    ],
    doorFinish: [
        'Unfinished',
        'Prime-Only',
        'Factory Primed',
        'Pre-painted White',
        'Stained - Natural',
        'Stained - Dark Walnut',
        'Stained - Cherry',
        'Painted - Custom Color'
    ],
    hardwareFinish: [
        'Satin Nickel',
        'Brushed Nickel',
        'Oil Rubbed Bronze',
        'Polished Chrome',
        'Matte Black',
        'Antique Brass',
        'Polished Brass',
        'Stainless Steel'
    ]
};

// Current modal category being edited
let currentModalCategory = null;
let doorConfigCount = 0;

// Custom Dialog Functions
function showDialog(message, type = 'alert', icon = '✓') {
    return new Promise((resolve) => {
        const dialog = document.getElementById('customDialog');
        const dialogMessage = document.getElementById('dialogMessage');
        const dialogButtons = document.getElementById('dialogButtons');
        const dialogIcon = document.getElementById('dialogIcon');
        
        dialogMessage.textContent = message;
        dialogIcon.textContent = icon;
        dialogButtons.innerHTML = '';
        
        if (type === 'confirm') {
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'dialog-btn dialog-btn-primary';
            confirmBtn.textContent = 'Confirm';
            confirmBtn.onclick = () => {
                dialog.classList.remove('active');
                resolve(true);
            };
            
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'dialog-btn dialog-btn-secondary';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.onclick = () => {
                dialog.classList.remove('active');
                resolve(false);
            };
            
            dialogButtons.appendChild(confirmBtn);
            dialogButtons.appendChild(cancelBtn);
        } else {
            const okBtn = document.createElement('button');
            okBtn.className = 'dialog-btn dialog-btn-primary';
            okBtn.textContent = 'OK';
            okBtn.onclick = () => {
                dialog.classList.remove('active');
                resolve(true);
            };
            dialogButtons.appendChild(okBtn);
        }
        
        dialog.classList.add('active');
    });
}

// Toast Notification Function
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.getElementById('toast');
    
    // Icon mapping
    const icons = {
        success: '✓',
        error: '⚠️',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    
    toast.className = `toast ${type}`;
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hide toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Initialize the application
function init() {
    loadOptionsFromStorage();
    setupEventListeners();
    // Add first door configuration by default
    addDoorConfiguration();
    // Generate initial quote on page load
    setTimeout(() => {
        autoGenerateQuote();
    }, 100);
}

// Load options from localStorage or use defaults
function loadOptionsFromStorage() {
    for (const category in defaultOptions) {
        const stored = localStorage.getItem(category);
        if (!stored) {
            // First time - create with defaults
            localStorage.setItem(category, JSON.stringify({
                default: defaultOptions[category],
                custom: []
            }));
        } else {
            // Check if defaults need updating (e.g., new options like MDF)
            const storedData = JSON.parse(stored);
            const currentDefaults = defaultOptions[category];
            
            // Add any new defaults that aren't already in storage
            currentDefaults.forEach(defaultOption => {
                if (!storedData.default.includes(defaultOption)) {
                    storedData.default.push(defaultOption);
                }
            });
            
            // Update storage with merged defaults
            localStorage.setItem(category, JSON.stringify(storedData));
        }
    }
}

// Get all options for a category (default + custom)
function getAllOptions(category) {
    const stored = JSON.parse(localStorage.getItem(category));
    return [...stored.default, ...stored.custom];
}

// Get custom options for a category
function getCustomOptions(category) {
    const stored = JSON.parse(localStorage.getItem(category));
    return stored.custom || [];
}

// Populate all select dropdowns
function populateAllSelects() {
    // This function is now handled per-card
    // Update all existing cards when options change
    const cards = document.querySelectorAll('.door-config-card');
    cards.forEach(card => populateCardSelects(card));
}

// Populate a specific select dropdown (legacy - for modal updates)
function populateSelect(category) {
    // Update all selects of this category across all cards
    populateAllSelects();
}

// Setup event listeners
function setupEventListeners() {
    // Close modal when clicking outside
    const modal = document.getElementById('optionModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Enter key to add new option
    document.getElementById('newOptionInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNewOption();
        }
    });
    
    // Add focus effects to all inputs
    setupInputEffects();
}

// Setup conditional logic for smart form sections
function setupConditionalLogic(card) {
    const doorConfigSelect = card.querySelector('.door-config-select');
    const doorTypeSelect = card.querySelector('.door-type-select');
    
    // Get section elements
    const jambSection = Array.from(card.querySelectorAll('.form-section-compact')).find(section => 
        section.querySelector('h4')?.textContent === 'Jamb / Frame Information'
    );
    const handingSection = Array.from(card.querySelectorAll('.form-section-compact')).find(section => 
        section.querySelector('h4')?.textContent === 'Handing / Swing Direction'
    );
    const glassSection = Array.from(card.querySelectorAll('.form-section-compact')).find(section => 
        section.querySelector('h4')?.textContent === 'Glass Configuration'
    );
    const hingeSection = Array.from(card.querySelectorAll('.form-section-compact')).find(section => 
        section.querySelector('h4')?.textContent === 'Hinge Specifications'
    );
    const hardwarePrepSection = Array.from(card.querySelectorAll('.form-section-compact')).find(section => 
        section.querySelector('h4')?.textContent === 'Hardware Prep'
    );
    
    // Function to update visibility based on selections
    function updateSectionVisibility() {
        const configValue = doorConfigSelect.value;
        const typeValue = doorTypeSelect.value;
        
        // Hide jamb section if "Slab Only" or "Replacement Slab"
        if (jambSection) {
            const shouldHide = configValue === 'Slab Only' || configValue === 'Replacement Slab';
            toggleSection(jambSection, !shouldHide);
        }
        
        // Hide handing if "Slab Only" or "Replacement Slab"
        if (handingSection) {
            const shouldShow = configValue !== 'Slab Only' && configValue !== 'Replacement Slab';
            toggleSection(handingSection, shouldShow);
        }
        
        // Show glass section only for exterior doors or if glass-related door types
        if (glassSection) {
            const isExterior = typeValue.includes('Exterior') || typeValue.includes('French') || 
                              typeValue.includes('Entry') || typeValue.includes('Sliding');
            const isInteriorOnly = typeValue === 'Interior Door';
            toggleSection(glassSection, !isInteriorOnly);
        }
        
        // Hide hinge section for slab only (no hinge prep needed)
        // Pre-hung assumes 3 hinges by default, so detailed spec only needed if different
        if (hingeSection) {
            const shouldShow = configValue !== 'Slab Only' && configValue !== 'Replacement Slab';
            toggleSection(hingeSection, shouldShow);
        }
        
        // Hardware prep - always show but could add context-specific help text
        if (hardwarePrepSection) {
            // Always visible for now - user might want to specify even for complete units
            toggleSection(hardwarePrepSection, true);
        }
    }
    
    // Helper function to smoothly toggle section visibility
    function toggleSection(section, show) {
        if (show) {
            section.style.display = '';
            // Trigger reflow
            section.offsetHeight;
            section.classList.remove('conditionally-hidden');
        } else {
            section.classList.add('conditionally-hidden');
            // Wait for animation before hiding completely
            setTimeout(() => {
                if (section.classList.contains('conditionally-hidden')) {
                    section.style.display = 'none';
                }
            }, 300);
        }
    }
    
    // Add event listeners
    doorConfigSelect.addEventListener('change', updateSectionVisibility);
    doorTypeSelect.addEventListener('change', updateSectionVisibility);
    
    // Initial check
    updateSectionVisibility();
}

// Setup engaging input effects
function setupInputEffects() {
    document.addEventListener('focusin', (e) => {
        if (e.target.matches('input, select, textarea')) {
            const formGroup = e.target.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('focused');
            }
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.matches('input, select, textarea')) {
            const formGroup = e.target.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('focused');
            }
        }
    });
    
    // Add completion animations and trigger quote update
    document.addEventListener('change', (e) => {
        if (e.target.matches('select, input[type="text"], textarea, input[type="number"], input[type="checkbox"]')) {
            if (e.target.value || e.target.checked) {
                e.target.style.animation = 'successPulse 0.5s ease';
                setTimeout(() => {
                    e.target.style.animation = '';
                }, 500);
            }
            // Auto-generate quote on any change
            autoGenerateQuote();
        }
    });
    
    // Also trigger on input events for real-time typing
    document.addEventListener('input', (e) => {
        if (e.target.matches('input[type="text"], textarea')) {
            // Debounce the auto-generation for typing
            clearTimeout(window.quoteUpdateTimeout);
            window.quoteUpdateTimeout = setTimeout(() => {
                autoGenerateQuote();
            }, 500); // Wait 500ms after user stops typing
        }
    });
}

// Add a new door configuration
function addDoorConfiguration() {
    doorConfigCount++;
    const template = document.getElementById('doorConfigTemplate');
    const clone = template.content.cloneNode(true);
    
    // Set door number
    const doorNumber = clone.querySelector('.door-number');
    doorNumber.textContent = `#${doorConfigCount}`;
    
    // Get the card element
    const card = clone.querySelector('.door-config-card');
    card.dataset.doorId = doorConfigCount;
    
    // Add staggered animation delay
    card.style.animationDelay = `${doorConfigCount * 0.1}s`;
    
    // Populate all select dropdowns in this card
    populateCardSelects(card);
    
    // Setup custom dimension handler for this card
    const customDimInput = card.querySelector('.door-custom-dimension');
    const dimensionDisplay = card.querySelector('.dimension-display');
    customDimInput.addEventListener('input', function(e) {
        handleDimensionInputForCard(e.target, dimensionDisplay);
    });
    
    // Add to container
    const container = document.getElementById('doorConfigurationsContainer');
    container.appendChild(clone);
    
    // Setup conditional logic after card is added
    const addedCard = container.lastElementChild;
    setupConditionalLogic(addedCard);
    
    // Smooth scroll to new card
    setTimeout(() => {
        addedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Populate all selects in a door card
function populateCardSelects(card) {
    const selectMap = {
        'door-config-select': 'doorConfig',
        'door-type-select': 'doorType',
        'door-material-select': 'doorMaterial',
        'door-size-select': 'doorSize',
        'door-thickness-select': 'doorThickness',
        'door-style-select': 'doorStyle',
        'door-glass-select': 'glassType',
        'door-handing-select': 'handingSwing',
        'door-jamb-depth-select': 'jambDepth',
        'door-hinge-size-select': 'hingeSize',
        'door-hinge-style-select': 'hingeStyle',
        'door-hinge-color-select': 'hingeColor',
        'door-lock-bore-select': 'lockBore',
        'door-backset-select': 'backset',
        'door-finish-select': 'doorFinish',
        'door-hardware-finish-select': 'hardwareFinish'
    };
    
    for (const [className, category] of Object.entries(selectMap)) {
        const select = card.querySelector(`.${className}`);
        if (select) {
            populateSelectElement(select, category);
        }
    }
}

// Populate a specific select element
function populateSelectElement(select, category) {
    const options = getAllOptions(category);
    
    // Clear existing options except the first one (placeholder)
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Add all options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

// Toggle door configuration collapse/expand
function toggleDoorConfig(card) {
    if (typeof card === 'object' && card.classList) {
        const wasCollapsed = card.classList.contains('collapsed');
        card.classList.toggle('collapsed');
        updateDoorSummary(card);
        
        // Add celebratory animation when collapsing (completing a door)
        if (!wasCollapsed) {
            card.style.animation = 'completePulse 0.6s ease';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        }
    }
}

// Update door summary when collapsed
function updateDoorSummary(card) {
    const summary = card.querySelector('.door-config-summary');
    if (!card.classList.contains('collapsed')) {
        summary.innerHTML = '';
        return;
    }
    
    const location = card.querySelector('.door-location').value;
    const type = card.querySelector('.door-type-select').value;
    const material = card.querySelector('.door-material-select').value;
    const size = card.querySelector('.door-size-select').value || card.querySelector('.door-custom-dimension').value;
    
    let summaryText = [];
    if (location) summaryText.push(`<strong>Location:</strong> ${location}`);
    if (type) summaryText.push(`<strong>Type:</strong> ${type}`);
    if (material) summaryText.push(`<strong>Material:</strong> ${material}`);
    if (size) summaryText.push(`<strong>Size:</strong> ${size}`);
    
    summary.innerHTML = summaryText.length > 0 ? summaryText.join(' | ') : '<em>No details entered yet</em>';
}

// Duplicate a door configuration
function duplicateDoor(button) {
    const card = button.closest('.door-config-card');
    const newCard = card.cloneNode(true);
    
    doorConfigCount++;
    newCard.dataset.doorId = doorConfigCount;
    newCard.querySelector('.door-number').textContent = `#${doorConfigCount}`;
    
    // Expand the new card
    newCard.classList.remove('collapsed');
    newCard.querySelector('.door-config-summary').innerHTML = '';
    
    // Re-setup event listener for custom dimension
    const customDimInput = newCard.querySelector('.door-custom-dimension');
    const dimensionDisplay = newCard.querySelector('.dimension-display');
    customDimInput.addEventListener('input', function(e) {
        handleDimensionInputForCard(e.target, dimensionDisplay);
    });
    
    // Insert after current card
    card.parentNode.insertBefore(newCard, card.nextSibling);
    
    // Setup conditional logic for the new card
    setupConditionalLogic(newCard);
}

// Delete a door configuration
function deleteDoor(button) {
    const card = button.closest('.door-config-card');
    const container = document.getElementById('doorConfigurationsContainer');
    
    // Prevent deleting the last door
    if (container.children.length <= 1) {
        showToast('You must have at least one door configuration', 'warning');
        return;
    }
    
    showDialog('Are you sure you want to delete this door configuration?', 'confirm', '🗑️').then(confirmed => {
        if (confirmed) {
            card.remove();
            // Renumber remaining doors
            renumberDoors();
            // Update quote output
            autoGenerateQuote();
        }
    });
}

// Renumber all door configurations
function renumberDoors() {
    const cards = document.querySelectorAll('.door-config-card');
    cards.forEach((card, index) => {
        card.querySelector('.door-number').textContent = `#${index + 1}`;
        card.dataset.doorId = index + 1;
    });
    doorConfigCount = cards.length;
}

// Handle dimension input for a specific card
function handleDimensionInputForCard(input, display) {
    const value = input.value.trim();
    
    if (!value) {
        display.textContent = '';
        return;
    }
    
    const formatted = formatDimension(value);
    if (formatted) {
        display.textContent = `Formatted: ${formatted}`;
        display.style.color = 'var(--accent-color)';
    } else {
        display.textContent = 'Invalid format';
        display.style.color = 'var(--danger-color)';
    }
}

// Format dimension from various input formats
function formatDimension(input) {
    // Remove extra spaces
    input = input.replace(/\s+/g, '');
    
    // Pattern 1: 36x80 or 36X80
    const pattern1 = /^(\d+)x(\d+)$/i;
    if (pattern1.test(input)) {
        const match = input.match(pattern1);
        const width = parseInt(match[1]);
        const height = parseInt(match[2]);
        return formatBothDimensions(width, height);
    }
    
    // Pattern 2: 3'0"x6'8" or variations
    const pattern2 = /^(\d+)'(\d+)"?x(\d+)'(\d+)"?$/i;
    if (pattern2.test(input)) {
        const match = input.match(pattern2);
        const widthFeet = parseInt(match[1]);
        const widthInches = parseInt(match[2]);
        const heightFeet = parseInt(match[3]);
        const heightInches = parseInt(match[4]);
        
        const totalWidth = widthFeet * 12 + widthInches;
        const totalHeight = heightFeet * 12 + heightInches;
        return formatBothDimensions(totalWidth, totalHeight);
    }
    
    // Pattern 3: 36 x 80 (with spaces)
    const pattern3 = /^(\d+)\s*x\s*(\d+)$/i;
    if (pattern3.test(input)) {
        const match = input.match(pattern3);
        const width = parseInt(match[1]);
        const height = parseInt(match[2]);
        return formatBothDimensions(width, height);
    }
    
    return null;
}

// Format dimensions in both formats
function formatBothDimensions(widthInches, heightInches) {
    const widthFeet = Math.floor(widthInches / 12);
    const widthRemainder = widthInches % 12;
    const heightFeet = Math.floor(heightInches / 12);
    const heightRemainder = heightInches % 12;
    
    const feetFormat = `${widthFeet}'${widthRemainder}"x${heightFeet}'${heightRemainder}"`;
    const inchesFormat = `${widthInches}"x${heightInches}"`;
    
    return `${feetFormat} (${inchesFormat})`;
}

// Open modal for managing options
function openModal(category) {
    currentModalCategory = category;
    const modal = document.getElementById('optionModal');
    const modalTitle = document.getElementById('modalTitle');
    
    // Set modal title
    const categoryNames = {
        doorConfig: 'Door Configurations',
        doorType: 'Door Types',
        doorMaterial: 'Door Materials',
        doorSize: 'Door Sizes',
        doorThickness: 'Door Thickness Options',
        doorStyle: 'Door Styles',
        glassType: 'Glass Types',
        handingSwing: 'Handing/Swing Options',
        jambDepth: 'Jamb Depths',
        hingeSize: 'Hinge Sizes',
        hingeStyle: 'Hinge Styles',
        hingeColor: 'Hinge Colors',
        lockBore: 'Lock Bore Sizes',
        backset: 'Backset Sizes',
        doorFinish: 'Door Finishes',
        hardwareFinish: 'Hardware Finishes'
    };
    
    modalTitle.textContent = `Manage ${categoryNames[category]}`;
    
    // Populate options list
    displayOptionsInModal(category);
    
    // Show modal
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('optionModal');
    modal.classList.remove('active');
    document.getElementById('newOptionInput').value = '';
    currentModalCategory = null;
}

// Display options in modal
function displayOptionsInModal(category) {
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    
    const stored = JSON.parse(localStorage.getItem(category));
    
    // Add restore defaults button at the top
    const restoreSection = document.createElement('div');
    restoreSection.className = 'restore-section';
    restoreSection.innerHTML = `
        <button type="button" class="btn-restore-defaults" onclick="restoreDefaults()">
            <span>↺</span> Restore All Defaults
        </button>
    `;
    optionsList.appendChild(restoreSection);
    
    // Display default options (now deletable)
    stored.default.forEach(option => {
        const optionItem = createOptionItem(option, true);
        optionsList.appendChild(optionItem);
    });
    
    // Display custom options
    stored.custom.forEach(option => {
        const optionItem = createOptionItem(option, false);
        optionsList.appendChild(optionItem);
    });
}

// Create option item element
function createOptionItem(optionText, isDefault) {
    const div = document.createElement('div');
    div.className = 'option-item' + (isDefault ? ' default' : '');
    
    const textSpan = document.createElement('span');
    textSpan.className = 'option-text';
    textSpan.textContent = optionText;
    
    div.appendChild(textSpan);
    
    if (isDefault) {
        const badge = document.createElement('span');
        badge.className = 'option-badge';
        badge.textContent = 'Default';
        div.appendChild(badge);
    }
    
    // All options are now deletable (including defaults)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteOption(optionText, isDefault);
    div.appendChild(deleteBtn);
    
    return div;
}

// Add new custom option
function addNewOption() {
    if (!currentModalCategory) return;
    
    const input = document.getElementById('newOptionInput');
    const newOption = input.value.trim();
    
    if (!newOption) {
        showToast('Please enter an option value', 'warning');
        return;
    }
    
    // Check if option already exists
    const allOptions = getAllOptions(currentModalCategory);
    if (allOptions.includes(newOption)) {
        showToast('This option already exists', 'warning');
        return;
    }
    
    // For door sizes, validate and format
    if (currentModalCategory === 'doorSize') {
        const formatted = formatDimension(newOption);
        if (!formatted) {
            showToast('Invalid dimension format. Use: 36x80 or 3\'0"x6\'8"', 'error');
            return;
        }
        
        // Use formatted version
        const stored = JSON.parse(localStorage.getItem(currentModalCategory));
        stored.custom.push(formatted);
        localStorage.setItem(currentModalCategory, JSON.stringify(stored));
    } else {
        // Add to custom options
        const stored = JSON.parse(localStorage.getItem(currentModalCategory));
        stored.custom.push(newOption);
        localStorage.setItem(currentModalCategory, JSON.stringify(stored));
    }
    
    // Update UI - repopulate all door cards
    populateAllSelects();
    displayOptionsInModal(currentModalCategory);
    input.value = '';
}

// Delete option (custom or default)
function deleteOption(optionText, isDefault = false) {
    if (!currentModalCategory) return;
    
    const confirmMsg = isDefault 
        ? `Are you sure you want to delete the default option "${optionText}"? You can restore it later.`
        : `Are you sure you want to delete "${optionText}"?`;
    
    showDialog(confirmMsg, 'confirm', '🗑️').then(confirmed => {
        if (!confirmed) {
            return;
        }
    
    const stored = JSON.parse(localStorage.getItem(currentModalCategory));
    
    if (isDefault) {
        // Remove from default array
        stored.default = stored.default.filter(opt => opt !== optionText);
    } else {
        // Remove from custom array
        stored.custom = stored.custom.filter(opt => opt !== optionText);
    }
    
    localStorage.setItem(currentModalCategory, JSON.stringify(stored));
    
    // Update UI - repopulate all door cards
    populateAllSelects();
    displayOptionsInModal(currentModalCategory);
    });
}

// Restore all default options for current category
function restoreDefaults() {
    if (!currentModalCategory) return;
    
    showDialog('Restore all default options for this category? This will not affect your custom options.', 'confirm', '↺').then(confirmed => {
        if (!confirmed) {
            return;
        }
    
    // Reset defaults from the original defaultOptions object
    const stored = JSON.parse(localStorage.getItem(currentModalCategory));
    stored.default = [...defaultOptions[currentModalCategory]];
    localStorage.setItem(currentModalCategory, JSON.stringify(stored));
    
    // Update UI
    populateAllSelects();
    displayOptionsInModal(currentModalCategory);
    });
}

// Generate quote request
function generateQuote() {
    const customerName = document.getElementById('customerName').value;
    const projectName = document.getElementById('projectName').value;
    const projectAddress = document.getElementById('projectAddress').value;
    const cards = document.querySelectorAll('.door-config-card');
    
    if (cards.length === 0) {
        return;
    }
    
    // Generate quote text
    let quoteText = '';
    quoteText += '━'.repeat(60) + '\n';
    quoteText += '  DOOR QUOTE REQUEST\n';
    quoteText += '━'.repeat(60) + '\n\n';
    
    // Project Information
    if (customerName || projectName || projectAddress) {
        quoteText += 'PROJECT INFORMATION\n';
        if (customerName) quoteText += `  Customer: ${customerName}\n`;
        if (projectName) quoteText += `  Project: ${projectName}\n`;
        if (projectAddress) quoteText += `  Address: ${projectAddress}\n`;
        quoteText += '\n';
    }
    
    // Process each door
    cards.forEach((card, index) => {
        const doorNum = index + 1;
        quoteText += '\n' + '─'.repeat(60) + '\n';
        quoteText += `  DOOR CONFIGURATION #${doorNum}\n`;
        quoteText += '─'.repeat(60) + '\n\n';
        
        const doorLocation = card.querySelector('.door-location').value;
        const doorConfig = card.querySelector('.door-config-select').value;
        const doorType = card.querySelector('.door-type-select').value;
        const doorMaterial = card.querySelector('.door-material-select').value;
        const doorThickness = card.querySelector('.door-thickness-select').value;
        const doorStyle = card.querySelector('.door-style-select').value;
        const glassType = card.querySelector('.door-glass-select').value;
        const doorFinish = card.querySelector('.door-finish-select').value;
        
        let dimensions = card.querySelector('.door-size-select').value;
        const customDimension = card.querySelector('.door-custom-dimension').value.trim();
        
        if (customDimension) {
            const formatted = formatDimension(customDimension);
            if (formatted) {
                dimensions = formatted;
            }
        }
        
        const handingSwing = card.querySelector('.door-handing-select').value;
        const jambDepth = card.querySelector('.door-jamb-depth-select').value;
        const jambNotes = card.querySelector('.door-jamb-notes').value;
        const hingeCount = card.querySelector('.door-hinge-count').value;
        const hingeSize = card.querySelector('.door-hinge-size-select').value;
        const hingeStyle = card.querySelector('.door-hinge-style-select').value;
        const hingeColor = card.querySelector('.door-hinge-color-select').value;
        const hingeLocations = card.querySelector('.door-hinge-locations').value;
        const hingeNotes = card.querySelector('.door-hinge-notes').value;
        const lockBore = card.querySelector('.door-lock-bore-select').value;
        const backset = card.querySelector('.door-backset-select').value;
        const deadboltPrep = card.querySelector('.door-deadbolt-prep').checked;
        const hardwareNotes = card.querySelector('.door-hardware-notes').value;
        const hardwareFinish = card.querySelector('.door-hardware-finish-select').value;
        const quantity = card.querySelector('.door-quantity').value;
        const additionalNotes = card.querySelector('.door-additional-notes').value;
        
        // Track missing required fields instead of alerting
        const missingFields = [];
        if (!doorType) missingFields.push('Door Type');
        if (!doorMaterial) missingFields.push('Material');
        if (!dimensions) missingFields.push('Dimensions');
        
        // Store missing fields for this door
        if (missingFields.length > 0) {
            if (!window.doorMissingFields) window.doorMissingFields = {};
            window.doorMissingFields[doorNum] = missingFields;
        } else {
            if (window.doorMissingFields) {
                delete window.doorMissingFields[doorNum];
            }
        }
        
        // Door Location
        if (doorLocation) {
            quoteText += `Location: ${doorLocation}\n\n`;
        }
        
        // Door Specifications
        quoteText += 'DOOR SPECIFICATIONS\n';
        if (doorConfig) quoteText += `   Configuration: ${doorConfig}\n`;
        if (doorType) {
            quoteText += `   Type: ${doorType}\n`;
        } else {
            quoteText += `   Type: [NOT SPECIFIED]\n`;
        }
        if (doorMaterial) {
            quoteText += `   Material: ${doorMaterial}\n`;
        } else {
            quoteText += `   Material: [NOT SPECIFIED]\n`;
        }
        if (dimensions) {
            quoteText += `   Dimensions: ${dimensions}\n`;
        } else {
            quoteText += `   Dimensions: [NOT SPECIFIED]\n`;
        }
        if (doorThickness) quoteText += `   Thickness: ${doorThickness}\n`;
        if (doorStyle) quoteText += `   Style: ${doorStyle}\n`;
        if (glassType && glassType !== 'None') quoteText += `   Glass: ${glassType}\n`;
        if (doorFinish) quoteText += `   Finish: ${doorFinish}\n`;
        quoteText += '\n';
        
        // Handing/Swing
        if (handingSwing) {
            quoteText += 'HANDING / SWING\n';
            quoteText += `  ${handingSwing}\n\n`;
        }
        
        // Jamb Information
        if (jambDepth || jambNotes) {
            quoteText += 'JAMB / FRAME\n';
            if (jambDepth) quoteText += `  Depth: ${jambDepth}\n`;
            if (jambNotes) quoteText += `  Notes: ${jambNotes}\n`;
            quoteText += '\n';
        }
        
        // Hinge Specifications
        if (hingeCount || hingeSize || hingeStyle || hingeColor || hingeLocations || hingeNotes) {
            quoteText += 'HINGE SPECIFICATIONS\n';
            if (hingeCount) quoteText += `  Quantity: (${hingeCount}) hinges\n`;
            if (hingeSize) quoteText += `  Size: ${hingeSize}\n`;
            if (hingeStyle) quoteText += `  Style: ${hingeStyle}\n`;
            if (hingeColor) quoteText += `  Color: ${hingeColor}\n`;
            if (hingeLocations) quoteText += `  Locations: ${hingeLocations}\n`;
            if (hingeNotes) quoteText += `  Notes: ${hingeNotes}\n`;
            quoteText += '\n';
        }
        
        // Hardware Prep
        if (lockBore || backset || deadboltPrep || hardwareNotes || hardwareFinish) {
            quoteText += 'HARDWARE PREP\n';
            if (lockBore) quoteText += `  Lock Bore: ${lockBore}\n`;
            if (backset) quoteText += `  Backset: ${backset}\n`;
            if (deadboltPrep) quoteText += `  Deadbolt Prep: Yes\n`;
            if (hardwareFinish) quoteText += `  Hardware Finish: ${hardwareFinish}\n`;
            if (hardwareNotes) quoteText += `  Notes: ${hardwareNotes}\n`;
            quoteText += '\n';
        }
        
        // Quantity
        quoteText += `QUANTITY: ${quantity} unit(s)\n`;
        
        // Additional Notes
        if (additionalNotes) {
            quoteText += `\nADDITIONAL NOTES\n${additionalNotes}\n`;
        }
        
        quoteText += '\n';
    });
    
    quoteText += '━'.repeat(60) + '\n';
    quoteText += '  END OF QUOTE REQUEST\n';
    quoteText += '━'.repeat(60);
    
    // Display quote - convert to HTML with bold headers
    const quoteOutput = document.getElementById('quoteOutput');
    const quoteContent = document.getElementById('quoteContent');
    const quoteWarning = document.getElementById('quoteWarning');
    const quoteWarningText = document.getElementById('quoteWarningText');
    
    // Update warning banner based on missing fields
    if (window.doorMissingFields && Object.keys(window.doorMissingFields).length > 0) {
        const doorNumbers = Object.keys(window.doorMissingFields);
        const fieldsList = [];
        
        doorNumbers.forEach(doorNum => {
            const fields = window.doorMissingFields[doorNum];
            fieldsList.push(`Door #${doorNum}: ${fields.join(', ')}`);
        });
        
        quoteWarningText.textContent = `Missing required fields - ${fieldsList.join(' | ')}`;
        quoteWarning.classList.remove('hidden');
    } else {
        quoteWarning.classList.add('hidden');
    }
    
    // Convert plain text to HTML with bold formatting
    const htmlContent = formatQuoteAsHTML(quoteText);
    quoteContent.innerHTML = htmlContent;
    quoteOutput.classList.remove('hidden');
    
    // Scroll to quote only if manually triggered
    if (window.manualQuoteGeneration) {
        quoteOutput.scrollIntoView({ behavior: 'smooth' });
        window.manualQuoteGeneration = false;
    }
}

// Auto-generate quote (called on form changes)
function autoGenerateQuote() {
    const cards = document.querySelectorAll('.door-config-card');
    
    // Always generate if there's at least one door card
    if (cards.length === 0) {
        return;
    }
    
    // Always generate quote to show structure and warnings
    generateQuote();
}

// Format quote text as HTML with bold headers
function formatQuoteAsHTML(text) {
    const lines = text.split('\n');
    let html = '';
    
    lines.forEach(line => {
        const trimmed = line.trim();
        
        // Main document header
        if (trimmed === 'DOOR QUOTE REQUEST') {
            html += `<div class="quote-title">${trimmed}</div>\n`;
        }
        // Door configuration headers
        else if (trimmed.startsWith('DOOR CONFIGURATION #')) {
            html += `<div class="quote-door-header">${trimmed}</div>\n`;
        }
        // Section headers (all caps)
        else if (line.match(/^[A-Z][A-Z\s\/\#]+$/) && !line.match(/^\s{3,}/)) {
            html += `<div class="quote-section">${trimmed}</div>\n`;
        }
        // Heavy separator (main)
        else if (line.match(/^[━]+$/)) {
            html += `<div class="quote-separator-main"></div>\n`;
        }
        // Light separator (sections)
        else if (line.match(/^[─]+$/)) {
            html += `<div class="quote-separator-light"></div>\n`;
        }
        // Content lines with labels (e.g., "Type: Interior Door")
        else if (trimmed.match(/^\w[\w\s\/]+:\s*.+$/)) {
            const parts = trimmed.split(':');
            const label = parts[0].trim();
            const value = parts.slice(1).join(':').trim();
            html += `<div class="quote-item"><span class="quote-label">${label}:</span> ${value}</div>\n`;
        }
        // Empty lines - minimal spacing
        else if (trimmed.length === 0) {
            html += '<div class="quote-spacer"></div>\n';
        }
        // Regular content
        else {
            html += `<div class="quote-text">${line}</div>\n`;
        }
    });
    
    return html;
}

// Copy quote to clipboard with HTML formatting for email
function copyQuote() {
    const quoteContent = document.getElementById('quoteContent');
    
    // Create HTML with inline styles for email compatibility
    const htmlContent = quoteContent.innerHTML;
    
    // Convert CSS classes to inline styles for email - without background colors
    let styledHTML = htmlContent
        .replace(/<div class="quote-title">/g, '<div style="font-size: 1.4rem; font-weight: 700; color: #4a90e2 !important; text-align: center; margin-bottom: 1.5rem; letter-spacing: 0.5px;">')
        .replace(/<div class="quote-section">/g, '<div style="margin-bottom: 0.8rem; font-size: 1.1rem; font-weight: 700; color: #5a9fd4 !important; margin-top: 1rem; letter-spacing: 0.3px;">')
        .replace(/<div class="quote-item">/g, '<div style="margin-bottom: 0.4rem; padding-left: 0.5rem; color: #333333 !important;">')
        .replace(/<span class="quote-label">/g, '<span style="font-weight: 600; color: #4a90e2 !important;">')
        .replace(/<span class="quote-value">/g, '<span style="color: #333333 !important;">')
        .replace(/<div class="quote-separator-main">/g, '<div style="border-top: 2px solid #4a90e2 !important; margin: 1.5rem 0;">')
        .replace(/<div class="quote-separator-light">/g, '<div style="border-top: 1px solid #4a90e2 !important; margin: 1rem 0;">')
        .replace(/<div class="quote-door-header">/g, '<div style="font-size: 1.2rem; font-weight: 700; color: #4a90e2 !important; margin: 1.5rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid #4a90e2 !important;">')
        .replace(/<div class="quote-spacer">/g, '<div style="height: 0.3rem;">')
        .replace(/<div class="quote-text">/g, '<div style="color: #333333 !important; margin-bottom: 0.2rem;">');
    
    // Wrap in email-friendly table structure
    const emailHTML = `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 800px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <tr>
            <td style="padding: 2rem;">
                ${styledHTML}
            </td>
        </tr>
    </table>
    `;
    
    // Copy both HTML and plain text to clipboard
    const plainText = quoteContent.innerText || quoteContent.textContent;
    
    // Use ClipboardItem API to copy both formats
    const blob = new Blob([emailHTML], { type: 'text/html' });
    const textBlob = new Blob([plainText], { type: 'text/plain' });
    
    const clipboardItem = new ClipboardItem({
        'text/html': blob,
        'text/plain': textBlob
    });
    
    navigator.clipboard.write([clipboardItem]).then(() => {
        showToast('Quote copied with formatting!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback to plain text
        navigator.clipboard.writeText(plainText).then(() => {
            showToast('Quote copied successfully', 'success');
        });
    });
}

// Reset form
function resetForm() {
    showDialog('Are you sure you want to reset all door configurations?', 'confirm', '🔄').then(confirmed => {
    if (!confirmed) {
        return;
    }
    
    document.getElementById('customerName').value = '';
    document.getElementById('projectName').value = '';
    document.getElementById('projectAddress').value = '';
    document.getElementById('doorConfigurationsContainer').innerHTML = '';
    document.getElementById('quoteOutput').classList.add('hidden');
    doorConfigCount = 0;
    
    // Add one fresh door configuration
    addDoorConfiguration();
    });
}

// ========== DEV MENU FUNCTIONS ==========

// Toggle dev menu with ` key
document.addEventListener('keydown', function(e) {
    if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        toggleDevMenu();
    }
});

function toggleDevMenu() {
    const devMenu = document.getElementById('devMenu');
    devMenu.classList.toggle('active');
}

// Get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Get random number in range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random configuration
function generateRandomConfiguration(small = false) {
    // Clear existing doors first
    const container = document.getElementById('doorConfigurationsContainer');
    container.innerHTML = '';
    doorConfigCount = 0;
    
    // Add a new door
    addDoorConfiguration();
    
    // Get the card element
    const card = container.querySelector('.door-config-card');
    if (!card) return;
    
    // Fill project address with random data
    const customerNames = [
        'John Smith',
        'Sarah Johnson',
        'Michael Davis',
        'Emily Williams',
        'Robert Brown'
    ];
    const projectNames = [
        'Residential Renovation',
        'New Construction',
        'Commercial Office Build',
        'Home Remodel',
        'Multi-Unit Development'
    ];
    const addresses = [
        '123 Oak Street, Nashville TN 37207',
        '456 Maple Avenue, Franklin TN 37064',
        '789 Pine Road, Brentwood TN 37027',
        '321 Elm Drive, Murfreesboro TN 37130',
        '654 Cedar Lane, Hendersonville TN 37075'
    ];
    document.getElementById('customerName').value = getRandomItem(customerNames);
    document.getElementById('projectName').value = getRandomItem(projectNames);
    document.getElementById('projectAddress').value = getRandomItem(addresses);
    
    // Get all selects and inputs in the card
    const selects = card.querySelectorAll('select');
    const inputs = card.querySelectorAll('input[type="text"]:not(.dimension-input)');
    const textareas = card.querySelectorAll('textarea');
    
    // Fill random selections
    selects.forEach(select => {
        const options = Array.from(select.options).filter(opt => opt.value !== '');
        if (options.length > 0) {
            const randomOption = getRandomItem(options);
            select.value = randomOption.value;
            
            // Trigger change event to update completion state
            select.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    
    // If small configuration, only fill essential fields
    if (small) {
        // Fill only 3-5 random text inputs
        const numInputs = getRandomNumber(3, 5);
        const shuffledInputs = Array.from(inputs).sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < numInputs && i < shuffledInputs.length; i++) {
            const input = shuffledInputs[i];
            input.value = generateRandomText(input);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        // Fill 1-2 textareas
        const numTextareas = getRandomNumber(1, 2);
        const shuffledTextareas = Array.from(textareas).sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < numTextareas && i < shuffledTextareas.length; i++) {
            const textarea = shuffledTextareas[i];
            textarea.value = generateRandomText(textarea, true);
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
    } else {
        // Fill all text inputs with random data
        inputs.forEach(input => {
            input.value = generateRandomText(input);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        
        // Fill all textareas
        textareas.forEach(textarea => {
            textarea.value = generateRandomText(textarea, true);
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        });
    }
    
    // Fill dimension inputs
    const dimensionInputs = card.querySelectorAll('.dimension-input');
    dimensionInputs.forEach(input => {
        const dimensions = ['36x80', '32x80', '30x80', '72x80', '60x80', "3'0\"x6'8\"", "2'8\"x6'8\""];
        input.value = getRandomItem(dimensions);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close dev menu
    toggleDevMenu();
}

// Generate random text based on input field
function generateRandomText(element, isLong = false) {
    const label = element.previousElementSibling?.textContent || element.placeholder || '';
    
    const samples = {
        quantity: () => String(getRandomNumber(1, 12)),
        color: () => getRandomItem(['White', 'Black', 'Gray', 'Brown', 'Natural Oak', 'Cherry', 'Mahogany', 'Espresso']),
        finish: () => getRandomItem(['Matte', 'Gloss', 'Satin', 'Semi-Gloss', 'Natural', 'Stained', 'Painted']),
        hardware: () => getRandomItem(['Brushed Nickel', 'Oil-Rubbed Bronze', 'Satin Chrome', 'Polished Brass', 'Matte Black']),
        notes: () => isLong ? 
            getRandomItem([
                'Customer prefers premium quality hardware. Please include samples if available.',
                'Rush order - needed within 2 weeks. Confirm availability before quoting.',
                'Match existing doors in property. Photos attached separately.',
                'Include installation if possible. Access is limited - discuss logistics.',
                'Budget-conscious project. Looking for best value options.'
            ]) : 
            getRandomItem(['Standard', 'Premium', 'Custom', 'As specified', 'See attached', 'Per blueprint'])
    };
    
    // Check label content to determine what to generate
    if (label.toLowerCase().includes('quantity') || label.toLowerCase().includes('qty')) {
        return samples.quantity();
    } else if (label.toLowerCase().includes('color')) {
        return samples.color();
    } else if (label.toLowerCase().includes('finish')) {
        return samples.finish();
    } else if (label.toLowerCase().includes('hardware')) {
        return samples.hardware();
    } else if (isLong || label.toLowerCase().includes('note')) {
        return samples.notes();
    } else {
        // Generic random text
        return getRandomItem(['Standard', 'Premium', 'Custom', 'N/A', 'TBD', 'See notes']);
    }
}

// Generate multiple random doors
function generateMultipleRandom(count) {
    // Clear existing doors
    const container = document.getElementById('doorConfigurationsContainer');
    container.innerHTML = '';
    doorConfigCount = 0;
    
    // Fill project info
    const customerNames = ['John Smith', 'Sarah Johnson', 'Michael Davis'];
    const projectNames = ['Residential Renovation', 'New Construction', 'Commercial Office'];
    const addresses = [
        '123 Oak Street, Nashville TN 37207',
        '456 Maple Avenue, Franklin TN 37064',
        '789 Pine Road, Brentwood TN 37027'
    ];
    document.getElementById('customerName').value = getRandomItem(customerNames);
    document.getElementById('projectName').value = getRandomItem(projectNames);
    document.getElementById('projectAddress').value = getRandomItem(addresses);
    
    // Add multiple doors with varying detail levels
    for (let i = 0; i < count; i++) {
        addDoorConfiguration();
        
        // Get the last added card
        const cards = container.querySelectorAll('.door-config-card');
        const card = cards[cards.length - 1];
        
        // Randomly decide if this should be a small or large config
        const isSmall = Math.random() > 0.5;
        
        // Fill the card
        fillCardRandomly(card, isSmall);
        
        // Add slight delay between cards for stagger effect
        setTimeout(() => {}, i * 100);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close dev menu
    toggleDevMenu();
}

// Fill a specific card with random data
function fillCardRandomly(card, small = false) {
    const selects = card.querySelectorAll('select');
    const inputs = card.querySelectorAll('input[type="text"]:not(.dimension-input)');
    const textareas = card.querySelectorAll('textarea');
    const dimensionInputs = card.querySelectorAll('.dimension-input');
    
    // Fill all selects
    selects.forEach(select => {
        const options = Array.from(select.options).filter(opt => opt.value !== '');
        if (options.length > 0) {
            select.value = getRandomItem(options).value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    
    // Fill dimensions
    dimensionInputs.forEach(input => {
        const dimensions = ['36x80', '32x80', '30x80', '72x80', "3'0\"x6'8\""];
        input.value = getRandomItem(dimensions);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    
    if (small) {
        // Fill only some inputs
        const numInputs = getRandomNumber(2, 4);
        const shuffledInputs = Array.from(inputs).sort(() => Math.random() - 0.5);
        for (let i = 0; i < numInputs && i < shuffledInputs.length; i++) {
            shuffledInputs[i].value = generateRandomText(shuffledInputs[i]);
            shuffledInputs[i].dispatchEvent(new Event('input', { bubbles: true }));
        }
    } else {
        // Fill all inputs
        inputs.forEach(input => {
            input.value = generateRandomText(input);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        
        textareas.forEach(textarea => {
            textarea.value = generateRandomText(textarea, true);
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        });
    }
}

// Clear all doors
function clearAllDoors() {
    showDialog('Clear all door configurations?', 'confirm', '🗑️').then(confirmed => {
        if (!confirmed) return;
    
    const container = document.getElementById('doorConfigurationsContainer');
    container.innerHTML = '';
    doorConfigCount = 0;
    document.getElementById('customerName').value = '';
    document.getElementById('projectName').value = '';
    document.getElementById('projectAddress').value = '';
    document.getElementById('quoteOutput').classList.add('hidden');
    
    // Add one fresh door
    addDoorConfiguration();
    
    // Close dev menu
    toggleDevMenu();
    });
}

// Setup tooltip positioning to prevent cutoff
function setupTooltips() {
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('info-icon')) {
            const tooltip = e.target.querySelector('.tooltip');
            if (tooltip) {
                const iconRect = e.target.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                
                // Position above the icon by default
                let top = iconRect.top - tooltipRect.height - 12;
                let left = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2);
                
                // Check if tooltip goes off top of screen
                if (top < 10) {
                    // Position below instead
                    top = iconRect.bottom + 12;
                }
                
                // Check if tooltip goes off left side
                if (left < 10) {
                    left = 10;
                }
                
                // Check if tooltip goes off right side
                if (left + tooltipRect.width > window.innerWidth - 10) {
                    left = window.innerWidth - tooltipRect.width - 10;
                }
                
                tooltip.style.top = top + 'px';
                tooltip.style.left = left + 'px';
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupTooltips();
});


