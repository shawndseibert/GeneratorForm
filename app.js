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

// Available modules definition
const availableModules = [
    {
        id: 'doorLocation',
        name: 'Door Location',
        icon: '📍',
        description: 'Specify where the door is located',
        required: true,
        tooltip: '<strong>Door Location Module</strong><br>Helps identify each door in your quote. Examples: "Master Bedroom", "Front Entry", "Kitchen Pantry", "Garage Access"',
        fieldTooltips: {
            location: 'Enter a descriptive location to identify this door in the quote. Be specific to avoid confusion when ordering multiple doors.'
        }
    },
    {
        id: 'doorConfig',
        name: 'Configuration',
        icon: '⚙️',
        description: 'Slab, pre-hung, or complete unit',
        required: true,
        tooltip: '<strong>Configuration Module</strong><br>Defines what you\'re ordering:<br><strong>Slab Only</strong> - Just the door panel<br><strong>Pre-hung</strong> - Door + frame/jamb<br><strong>Complete Unit</strong> - Door + frame + hardware<br><strong>Replacement Slab</strong> - New door for existing frame',
        fieldTooltips: {
            config: '<strong>Choose based on your needs:</strong><br>Slab Only: You have an existing frame<br>Pre-hung: Most common for new construction<br>Complete Unit: Everything included, ready to install<br>Replacement: Replacing just the door'
        }
    },
    {
        id: 'doorType',
        name: 'Door Type',
        icon: '🚪',
        description: 'Interior, exterior, entry, etc.',
        required: true,
        tooltip: '<strong>Door Type Module</strong><br>Specifies the door\'s purpose:<br><strong>Interior</strong> - Between rooms (1-3/8" thick)<br><strong>Exterior</strong> - Outside access (1-3/4" thick)<br><strong>Entry</strong> - Front/main door (heavier duty)<br><strong>French/Sliding</strong> - Multiple panels<br><strong>Bi-Fold/Pocket</strong> - Space-saving options',
        fieldTooltips: {
            type: '<strong>Common choices:</strong><br>Interior Door: Bedroom, bathroom, closet<br>Exterior Door: Back door, side entrance<br>Entry Door: Front door with security features<br>French Door: Dining room, patio access (glass panels)'
        }
    },
    {
        id: 'doorMaterial',
        name: 'Material',
        icon: '🪵',
        description: 'Wood, steel, fiberglass, etc.',
        tooltip: '<strong>Material Module</strong><br>Determines durability and appearance:<br><strong>Wood</strong> - Classic, can be stained (Oak, Maple, Cherry, Mahogany)<br><strong>MDF</strong> - Budget-friendly, smooth finish<br><strong>Steel</strong> - Secure, energy-efficient exterior<br><strong>Fiberglass</strong> - Low maintenance, weather resistant<br><strong>Composite</strong> - Durable, moisture resistant',
        fieldTooltips: {
            material: '<strong>Material Selection Guide:</strong><br><strong>Interior Budget</strong>: MDF or Composite<br><strong>Interior Premium</strong>: Solid Wood (Oak, Maple)<br><strong>Exterior Standard</strong>: Fiberglass or Steel<br><strong>Exterior Premium</strong>: Mahogany or Cherry Wood<br><strong>High Moisture</strong>: Fiberglass or Composite'
        }
    },
    {
        id: 'doorDimensions',
        name: 'Dimensions',
        icon: '📏',
        description: 'Size and thickness',
        required: true,
        tooltip: '<strong>Dimensions Module</strong><br>Specifies door size and thickness:<br><strong>Width x Height</strong> - Standard: 36"x80" (3\'0"x6\'8")<br><strong>Thickness</strong> - Interior: 1-3/8", Exterior: 1-3/4"<br>Common sizes: 30", 32", 36" wide; 80" or 84" tall',
        fieldTooltips: {
            size: '<strong>Standard Sizes:</strong><br><strong>36"x80"</strong> - Most common, ADA compliant<br><strong>32"x80"</strong> - Standard bedroom/bathroom<br><strong>30"x80"</strong> - Closets, smaller rooms<br><strong>36"x84"</strong> - 8-foot ceiling homes<br><strong>60-72"x80"</strong> - Double doors',
            thickness: '<strong>Thickness Guide:</strong><br><strong>1-3/8"</strong> - Standard interior doors<br><strong>1-3/4"</strong> - Exterior doors, fire-rated<br><strong>2"</strong> - Heavy duty, added security<br><strong>2-1/4"</strong> - Commercial or high-end residential'
        }
    },
    {
        id: 'doorStyle',
        name: 'Style',
        icon: '🎨',
        description: 'Shaker, panel, flush, etc.',
        tooltip: '<strong>Style Module</strong><br>Defines door appearance:<br><strong>Shaker</strong> - Clean, modern lines<br><strong>Panel</strong> - Traditional raised or flat panels<br><strong>Flush</strong> - Completely flat, minimalist<br><strong>Glass</strong> - Full, half, or 3/4 glass inserts<br><strong>Craftsman</strong> - Mission style with character',
        fieldTooltips: {
            style: '<strong>Style Selection:</strong><br><strong>Modern Homes</strong>: Shaker, Flush, Contemporary<br><strong>Traditional Homes</strong>: Raised Panel (2, 4, 6 panel)<br><strong>Craftsman Homes</strong>: Mission, Prairie style<br><strong>With Natural Light</strong>: 5-Lite, 9-Lite, 15-Lite<br><strong>Privacy Needed</strong>: Solid panel or flush'
        }
    },
    {
        id: 'glass',
        name: 'Glass',
        icon: '🪟',
        description: 'Glass type and configuration',
        tooltip: '<strong>Glass Module</strong><br>Adds glass elements to doors:<br><strong>Clear</strong> - Maximum visibility<br><strong>Frosted/Obscured</strong> - Privacy with light<br><strong>Decorative</strong> - Patterned or textured<br><strong>Low-E</strong> - Energy efficient (exterior)<br><strong>Tempered</strong> - Safety glass (required for exterior)',
        fieldTooltips: {
            glass: '<strong>Glass Options:</strong><br><strong>None</strong> - Solid door<br><strong>Clear Tempered</strong> - Exterior doors (required)<br><strong>Frosted</strong> - Bathrooms, privacy areas<br><strong>Low-E</strong> - Energy savings for exterior<br><strong>Decorative</strong> - Adds style, partial privacy<br><strong>IGU (Insulated)</strong> - Best for exterior, dual pane'
        }
    },
    {
        id: 'handing',
        name: 'Handing/Swing',
        icon: '↔️',
        description: 'Left/right hand swing direction',
        tooltip: '<strong>Handing Module</strong><br>Determines which way door opens:<br>Stand where hinges are NOT visible<br><strong>Right-Hand (RH)</strong> - Hinges on right, opens away<br><strong>Left-Hand (LH)</strong> - Hinges on left, opens away<br><strong>Inswing</strong> - Opens into room<br><strong>Outswing</strong> - Opens out (common for exterior)',
        fieldTooltips: {
            handing: '<strong>How to Determine Handing:</strong><br>Stand with your BACK AGAINST THE HINGES:<br><br><strong>Left-Hand:</strong> Door swings to your LEFT side<br>(like your left arm swinging)<br><br><strong>Right-Hand:</strong> Door swings to your RIGHT side<br>(like your right arm swinging)<br><br><strong>Inswing:</strong> Door swings INTO the building<br><strong>Outswing:</strong> Door swings OUT of the building<br><br><strong>Example:</strong> Left arm swings into building = Left-Hand Inswing<br>Right arm swings out = Right-Hand Outswing'
        }
    },
    {
        id: 'jamb',
        name: 'Jamb/Frame',
        icon: '🪟',
        description: 'Frame depth and notes',
        tooltip: '<strong>Jamb/Frame Module</strong><br>Specifies frame dimensions:<br><strong>Jamb Depth</strong> - Must match wall thickness<br>4-9/16" for 2x4 walls (standard interior)<br>6-9/16" for 2x6 walls (exterior, insulated)<br>Custom depths available for unique situations',
        fieldTooltips: {
            jamb: '<strong>Jamb Depth Selection:</strong><br><strong>4-9/16"</strong> - Standard 2x4 wall with 1/2" drywall<br><strong>5-1/4"</strong> - 2x4 wall with extra trim/casing<br><strong>6-9/16"</strong> - 2x6 wall (exterior, better insulation)<br><strong>6-3/4"</strong> - 2x6 wall with added material<br><strong>Custom</strong> - Measure your wall thickness<br><strong>Measure:</strong> Wall thickness + drywall both sides'
        }
    },
    {
        id: 'hinges',
        name: 'Hinges',
        icon: '🔩',
        description: 'Hinge specifications',
        tooltip: '<strong>Hinges Module</strong><br>Specifies hinge details:<br><strong>Count</strong> - 3 standard (up to 7\' door), 4 for taller<br><strong>Size</strong> - 3.5"x3.5" interior, 4"x4" exterior<br><strong>Style</strong> - Square corner, radius corner, decorative<br><strong>Finish</strong> - Match hardware (satin nickel, bronze, etc.)',
        fieldTooltips: {
            hingeCount: '<strong>Hinge Quantity:</strong><br><strong>3 hinges</strong> - Doors up to 7\' (84") tall<br><strong>4 hinges</strong> - Doors 7\'-8\' tall<br><strong>5+ hinges</strong> - Extra heavy or tall doors<br><strong>Spacing:</strong> Top hinge 7" from top, bottom 11" from bottom',
            hingeSize: '<strong>Hinge Size Guide:</strong><br><strong>3-1/2" x 3-1/2"</strong> - Standard interior<br><strong>4" x 4"</strong> - Exterior doors<br><strong>4-1/2" x 4-1/2"</strong> - Heavy doors<br><strong>5" x 5"</strong> - Extra heavy, commercial',
            hingeStyle: '<strong>Hinge Styles:</strong><br><strong>Square Corner</strong> - Traditional, most common<br><strong>Radius Corner</strong> - Rounded edges, modern look<br><strong>Decorative</strong> - Ornate, visible hinges<br><strong>Concealed</strong> - Hidden when door is closed'
        }
    },
    {
        id: 'hardware',
        name: 'Hardware Prep',
        icon: '🔧',
        description: 'Lock bore and backset',
        tooltip: '<strong>Hardware Prep Module</strong><br>Prepares door for locks/handles:<br><strong>Lock Bore</strong> - Hole for doorknob (2-1/8" standard)<br><strong>Backset</strong> - Distance from edge to center of bore<br>  2-3/4" standard, 2-3/8" for narrow stiles<br><strong>Deadbolt Prep</strong> - Additional hole above knob<br><strong>Privacy Lock</strong> - Bathroom, bedroom',
        fieldTooltips: {
            lockBore: '<strong>Lock Bore Sizes:</strong><br><strong>2-1/8"</strong> - Standard (most common)<br><strong>1-1/2"</strong> - Privacy/passage sets<br><strong>2-3/8"</strong> - Some commercial hardware<br><strong>Note:</strong> Match to your hardware specifications',
            backset: '<strong>Backset Measurements:</strong><br><strong>2-3/4"</strong> - Standard backset (most common)<br><strong>2-3/8"</strong> - For narrow stile doors or tight spaces<br><strong>5"</strong> - Commercial doors<br><strong>Measure:</strong> From door edge to center of knob',
            deadbolt: '<strong>Deadbolt Prep:</strong><br>Required for exterior doors<br>Usually 5-1/2" above doorknob<br>Match bore size to deadbolt (typically 2-1/8")<br>Consider double cylinder for glass doors'
        }
    },
    {
        id: 'finish',
        name: 'Finish',
        icon: '🎨',
        description: 'Paint, stain, or primed',
        tooltip: '<strong>Finish Module</strong><br>Specifies door finish:<br><strong>Primed</strong> - White primer, ready to paint<br><strong>Factory Painted</strong> - Pre-painted color<br><strong>Stain Grade</strong> - Natural wood grain visible<br><strong>Pre-stained</strong> - Stain applied at factory<br><strong>Clear Coat</strong> - Protective finish over wood',
        fieldTooltips: {
            finish: '<strong>Finish Options:</strong><br><strong>Primed White</strong> - Most versatile, paint any color<br><strong>Factory Painted</strong> - Saves time, professional finish<br><strong>Stain Grade</strong> - For wood doors, shows grain beauty<br><strong>Pre-stained</strong> - Natural wood with color<br><strong>Unfinished</strong> - For custom finishing on-site<br><strong>Tip:</strong> Factory finishes more durable than on-site'
        }
    }
];

// Track active modules per door
const doorModules = new Map();

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

// Render the module sidebar
function renderModuleSidebar() {
    const moduleList = document.getElementById('moduleList');
    if (!moduleList) return;
    
    // Check if there are any doors
    const doorCards = document.querySelectorAll('.door-config-card');
    let instructionHtml = '';
    
    if (doorCards.length > 0) {
        instructionHtml = `
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: var(--tertiary-bg); border-radius: 6px; border: 1px solid var(--accent-color);">
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">💡 Modules will be added to the expanded door configuration</p>
            </div>
        `;
    }
    
    moduleList.innerHTML = instructionHtml + availableModules.map(module => `
        <div class="module-item" data-module-id="${module.id}" onclick="handleModuleInfo(event, '${module.id}')">
            <span class="module-icon">${module.icon}</span>
            <div class="module-details">
                <span class="module-name">${module.name}${module.required ? ' *' : ''}</span>
                <span class="module-desc">${module.description}</span>
            </div>
        </div>
    `).join('');
}

// Handle module info hover/click - prevent adding when clicking info icon
function handleModuleInfo(event, moduleId) {
    // If clicking on info icon or its children, don't add module
    if (event.target.closest('.info-icon')) {
        event.stopPropagation();
        return;
    }
    
    // Get the expanded door
    const expandedCard = document.querySelector('.door-config-card:not(.collapsed)');
    
    if (!expandedCard) {
        showToast('Please expand a door configuration first', 'warning');
        return;
    }
    
    const doorId = expandedCard.dataset.doorId;
    addModuleToDoor(doorId, moduleId);
}

// Add module to a specific door
function addModuleToDoor(doorId, moduleId, silent = false) {
    const card = document.querySelector(`.door-config-card[data-door-id="${doorId}"]`);
    if (!card) return;
    
    // Initialize module tracking for this door if needed
    if (!doorModules.has(doorId)) {
        doorModules.set(doorId, new Set());
    }
    
    const activeMods = doorModules.get(doorId);
    
    // Check if module already added
    if (activeMods.has(moduleId)) {
        if (!silent) showToast('Module already added', 'info');
        return;
    }
    
    // Add module
    activeMods.add(moduleId);
    const module = availableModules.find(m => m.id === moduleId);
    
    // Create and insert module section
    const moduleSection = createModuleSection(moduleId, doorId);
    const doorBody = card.querySelector('.door-config-body');
    doorBody.appendChild(moduleSection);
    
    if (!silent) {
        showToast(`Added: ${module.name}`, 'success');
    }
    autoGenerateQuote();
}

// Create module HTML section
function createModuleSection(moduleId, doorId) {
    const section = document.createElement('section');
    section.className = 'form-section-compact';
    section.dataset.moduleId = moduleId;
    section.draggable = true;
    
    const module = availableModules.find(m => m.id === moduleId);
    
    // Helper function to create info tooltip
    const createInfoTooltip = (text) => {
        const id = 'tooltip-' + Math.random().toString(36).substr(2, 9);
        return `<span class="info-icon" data-tooltip-id="${id}" onclick="event.stopPropagation()">i<span class="tooltip" id="${id}">${text}</span></span>`;
    };
    
    // Add drag handle and remove button
    const dragHandle = `<span class="drag-handle" title="Drag to reorder">⋮⋮</span>`;
    const removeBtn = `<button type="button" class="remove-module-btn" onclick="removeModuleFromDoor('${doorId}', '${moduleId}')">Remove</button>`;
    
    // Generate HTML based on module type
    let html = '';
    
    switch(moduleId) {
        case 'doorLocation':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <input type="text" class="input-field door-location" placeholder="e.g., Downstairs Front Exterior">
                </div>
            `;
            break;
            
        case 'doorConfig':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <div class="option-group">
                        <select class="input-field door-config-select">
                            <option value="">Select Configuration</option>
                        </select>
                        <button type="button" class="btn-manage" onclick="openModal('doorConfig')">Manage</button>
                    </div>
                </div>
            `;
            break;
            
        case 'doorType':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Door Type
                        ${createInfoTooltip(module.fieldTooltips.type)}
                    </label>
                    <div class="option-group">
                        <select class="input-field door-type-select">
                            <option value="">Select Door Type</option>
                        </select>
                        <button type="button" class="btn-manage" onclick="openModal('doorType')">Manage</button>
                    </div>
                </div>
            `;
            break;
            
        case 'doorMaterial':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Material
                        ${createInfoTooltip(module.fieldTooltips.material)}
                    </label>
                    <div class="option-group">
                        <select class="input-field door-material-select">
                            <option value="">Select Material</option>
                        </select>
                        <button type="button" class="btn-manage" onclick="openModal('doorMaterial')">Manage</button>
                    </div>
                </div>
            `;
            break;
            
        case 'doorDimensions':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Door Size
                        ${createInfoTooltip(module.fieldTooltips.size)}
                    </label>
                    <div class="option-group">
                        <select class="input-field door-size-select">
                            <option value="">Select Size</option>
                        </select>
                        <button type="button" class="btn-manage" onclick="openModal('doorSize')">Manage</button>
                    </div>
                </div>
                <div class="custom-dimension">
                    <label>Or Enter Custom Dimension:</label>
                    <input type="text" class="input-field door-custom-dimension" placeholder='e.g., 36x80 or 3\\'0"x6\\'8"'>
                    <span class="dimension-display"></span>
                </div>
                <div class="form-row" style="margin-top: 1rem;">
                    <div class="form-group">
                        <label class="label-with-info">
                            Door Thickness
                            ${createInfoTooltip(module.fieldTooltips.thickness)}
                        </label>
                        <div class="option-group">
                            <select class="input-field door-thickness-select">
                                <option value="">Select Thickness</option>
                            </select>
                            <button type="button" class="btn-manage" onclick="openModal('doorThickness')">Manage</button>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'doorStyle':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Style
                        ${createInfoTooltip(module.fieldTooltips.style)}
                    </label>
                    <div class="option-group">
                        <select class="input-field door-style-select">
                            <option value="">Select Style</option>
                        </select>
                        <button type="button" class="btn-manage" onclick="openModal('doorStyle')">Manage</button>
                    </div>
                </div>
            `;
            break;
            
        case 'glass':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Glass Type
                        ${createInfoTooltip(module.fieldTooltips.glassType)}
                    </label>
                    <div class="option-group">
                        <select class="input-field door-glass-select">
                            <option value="">Select Glass Type</option>
                        </select>
                        <button type="button" class="btn-manage" onclick="openModal('glassType')">Manage</button>
                    </div>
                </div>
            `;
            break;
            
        case 'handing':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Handing/Swing
                        ${createInfoTooltip(module.fieldTooltips.handing)}
                    </label>
                    <div class="option-group">
                        <select class="input-field door-handing-select">
                            <option value="">Select Handing</option>
                        </select>
                        <button type="button" class="btn-manage" onclick="openModal('handingSwing')">Manage</button>
                    </div>
                </div>
            `;
            break;
            
        case 'jamb':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-with-info">
                            Jamb Depth
                            ${createInfoTooltip(module.fieldTooltips.depth)}
                        </label>
                        <div class="option-group">
                            <select class="input-field door-jamb-depth-select">
                                <option value="">Select Jamb Depth</option>
                            </select>
                            <button type="button" class="btn-manage" onclick="openModal('jambDepth')">Manage</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Jamb Notes
                        ${createInfoTooltip(module.fieldTooltips.notes)}
                    </label>
                    <input type="text" class="input-field door-jamb-notes" placeholder="e.g., Jamb/frame stays — slab-only replacement">
                </div>
            `;
            break;
            
        case 'hinges':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-with-info">
                            Number of Hinges
                            ${createInfoTooltip(module.fieldTooltips.count)}
                        </label>
                        <select class="input-field door-hinge-count">
                            <option value="">Select (3 assumed for pre-hung)</option>
                            <option value="2">2 Hinges</option>
                            <option value="3">3 Hinges</option>
                            <option value="4">4 Hinges</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="label-with-info">
                            Hinge Size
                            ${createInfoTooltip(module.fieldTooltips.size)}
                        </label>
                        <div class="option-group">
                            <select class="input-field door-hinge-size-select">
                                <option value="">Select Size</option>
                            </select>
                            <button type="button" class="btn-manage" onclick="openModal('hingeSize')">Manage</button>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-with-info">
                            Hinge Style
                            ${createInfoTooltip(module.fieldTooltips.style)}
                        </label>
                        <div class="option-group">
                            <select class="input-field door-hinge-style-select">
                                <option value="">Select Style</option>
                            </select>
                            <button type="button" class="btn-manage" onclick="openModal('hingeStyle')">Manage</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="label-with-info">
                            Hinge Color
                            ${createInfoTooltip(module.fieldTooltips.color)}
                        </label>
                        <div class="option-group">
                            <select class="input-field door-hinge-color-select">
                                <option value="">Select Color</option>
                            </select>
                            <button type="button" class="btn-manage" onclick="openModal('hingeColor')">Manage</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Hinge Locations (from top of slab to top of hinge)
                        ${createInfoTooltip(module.fieldTooltips.locations)}
                    </label>
                    <input type="text" class="input-field door-hinge-locations" placeholder='e.g., Top: 6-7/8", Middle: 35", Bottom: 63-5/8"'>
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Hinge Notes
                        ${createInfoTooltip(module.fieldTooltips.notes)}
                    </label>
                    <input type="text" class="input-field door-hinge-notes" placeholder="e.g., Must match existing hinge mortises exactly">
                </div>
            `;
            break;
            
        case 'hardware':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label-with-info">
                            Lock Bore
                            ${createInfoTooltip(module.fieldTooltips.lockBore)}
                        </label>
                        <div class="option-group">
                            <select class="input-field door-lock-bore-select">
                                <option value="">Select</option>
                            </select>
                            <button type="button" class="btn-manage" onclick="openModal('lockBore')">Manage</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="label-with-info">
                            Backset
                            ${createInfoTooltip(module.fieldTooltips.backset)}
                        </label>
                        <div class="option-group">
                            <select class="input-field door-backset-select">
                                <option value="">Select</option>
                            </select>
                            <button type="button" class="btn-manage" onclick="openModal('backset')">Manage</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" class="door-deadbolt-prep">
                        <span>Deadbolt Prep Required ${createInfoTooltip(module.fieldTooltips.deadbolt)}</span>
                    </label>
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Hardware Prep Notes
                        ${createInfoTooltip(module.fieldTooltips.notes)}
                    </label>
                    <input type="text" class="input-field door-hardware-notes" placeholder="e.g., Prepped to re-use existing hardware">
                </div>
            `;
            break;
            
        case 'finish':
            html = `
                <div class="module-header">
                    ${dragHandle}
                    <h4>${module.name}</h4>
                    ${removeBtn}
                </div>
                <div class="form-group">
                    <label class="label-with-info">
                        Finish
                        ${createInfoTooltip(module.fieldTooltips.finish)}
                    </label>
                    <div class="option-group">
                        <select class="input-field door-finish-select">
                            <option value="">Select Finish</option>
                        </select>
                        <button type="button" class="btn-manage" onclick="openModal('doorFinish')">Manage</button>
                    </div>
                </div>
            `;
            break;
    }
    
    section.innerHTML = html;
    
    // Populate selects in this module
    const selects = section.querySelectorAll('select');
    selects.forEach(select => {
        const classList = Array.from(select.classList);
        for (const cls of classList) {
            if (cls.includes('-select')) {
                const category = getCategoryFromClass(cls);
                if (category) {
                    populateSelectElement(select, category);
                }
            }
        }
    });
    
    // Setup custom dimension handler if this is dimensions module
    if (moduleId === 'doorDimensions') {
        const customDimInput = section.querySelector('.door-custom-dimension');
        const dimensionDisplay = section.querySelector('.dimension-display');
        if (customDimInput && dimensionDisplay) {
            customDimInput.addEventListener('input', function(e) {
                handleDimensionInputForCard(e.target, dimensionDisplay);
            });
        }
    }
    
    return section;
}

// Helper to get category from select class name
function getCategoryFromClass(className) {
    const mapping = {
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
    return mapping[className];
}

// Remove module from door
function removeModuleFromDoor(doorId, moduleId) {
    const activeMods = doorModules.get(doorId);
    if (activeMods) {
        activeMods.delete(moduleId);
    }
    
    const card = document.querySelector(`.door-config-card[data-door-id="${doorId}"]`);
    const section = card.querySelector(`[data-module-id="${moduleId}"]`);
    if (section) {
        section.remove();
    }
    
    const module = availableModules.find(m => m.id === moduleId);
    showToast(`Removed: ${module.name}`, 'info');
    autoGenerateQuote();
}

// Initialize the application
function init() {
    loadOptionsFromStorage();
    setupEventListeners();
    renderModuleSidebar();
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
    card.setAttribute('draggable', 'true');
    
    // Add staggered animation delay
    card.style.animationDelay = `${doorConfigCount * 0.1}s`;
    
    // Add to container
    const container = document.getElementById('doorConfigurationsContainer');
    container.appendChild(clone);
    
    // Get the actual card element after adding to DOM
    const addedCard = container.lastElementChild;
    
    // Initialize module tracking for this door
    doorModules.set(doorConfigCount.toString(), new Set());
    
    // Remove empty state and add required modules by default
    const doorBody = addedCard.querySelector('.door-config-body');
    const emptyState = doorBody.querySelector('.empty-state');
    
    // Auto-add required modules (location, config, type, material, dimensions)
    const requiredModules = ['doorLocation', 'doorConfig', 'doorType', 'doorMaterial', 'doorDimensions'];
    requiredModules.forEach(moduleId => {
        addModuleToDoor(doorConfigCount.toString(), moduleId, true);
    });
    
    // Remove empty state after adding required modules
    if (emptyState) {
        emptyState.remove();
    }
    
    // Smooth scroll to new card
    setTimeout(() => {
        addedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Refresh sidebar to show new door in selector
    renderModuleSidebar();
    
    autoGenerateQuote();
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
        
        // If expanding this card, collapse all others
        if (wasCollapsed) {
            const allCards = document.querySelectorAll('.door-config-card');
            allCards.forEach(otherCard => {
                if (otherCard !== card && !otherCard.classList.contains('collapsed')) {
                    otherCard.classList.add('collapsed');
                    updateDoorSummary(otherCard);
                }
            });
        }
        
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
        summary.classList.add('hidden');
        return;
    }
    
    const location = card.querySelector('.door-location')?.value || '';
    const type = card.querySelector('.door-type-select')?.value || '';
    const material = card.querySelector('.door-material-select')?.value || '';
    const size = card.querySelector('.door-size-select')?.value || card.querySelector('.door-custom-dimension')?.value || '';
    const style = card.querySelector('.door-style-select')?.value || '';
    const finish = card.querySelector('.door-finish-select')?.value || '';
    const handing = card.querySelector('.door-handing-select')?.value || '';
    const quantity = card.querySelector('.door-quantity-input')?.value || '1';
    
    let summaryParts = [];
    if (quantity && quantity !== '1') summaryParts.push(`Qty: ${quantity}`);
    if (location) summaryParts.push(location);
    if (type) summaryParts.push(type);
    if (material) summaryParts.push(material);
    if (size) summaryParts.push(size);
    if (style) summaryParts.push(style);
    if (handing) summaryParts.push(handing);
    if (finish) summaryParts.push(finish);
    
    if (summaryParts.length > 0) {
        summary.innerHTML = `<span style="color: var(--text-secondary);">📋</span> ${summaryParts.join(' • ')}`;
        summary.classList.remove('hidden');
    } else {
        summary.innerHTML = '<em style="color: var(--text-secondary);">No configuration details yet</em>';
        summary.classList.remove('hidden');
    }
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
            const doorId = card.dataset.doorId;
            card.remove();
            // Remove module tracking for this door
            doorModules.delete(doorId);
            // Renumber remaining doors
            renumberDoors();
            // Refresh sidebar
            renderModuleSidebar();
            // Expand the first door if all are collapsed
            const expandedCard = document.querySelector('.door-config-card:not(.collapsed)');
            if (!expandedCard) {
                const firstCard = document.querySelector('.door-config-card');
                if (firstCard) {
                    firstCard.classList.remove('collapsed');
                }
            }
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

// Generate output for a specific module
function generateModuleOutput(moduleId, card, missingFields) {
    let output = '';
    
    switch(moduleId) {
        case 'doorLocation':
            const doorLocation = card.querySelector('.door-location')?.value || '';
            if (doorLocation) {
                output += `Location: ${doorLocation}\n\n`;
            }
            break;
            
        case 'doorConfig':
            const doorConfig = card.querySelector('.door-config-select')?.value || '';
            if (doorConfig) {
                output += `Configuration: ${doorConfig}\n\n`;
            }
            break;
            
        case 'doorType':
            const doorType = card.querySelector('.door-type-select')?.value || '';
            if (doorType) {
                output += `Door Type: ${doorType}\n\n`;
            } else {
                missingFields.push('Door Type');
                output += `Door Type: [NOT SPECIFIED]\n\n`;
            }
            break;
            
        case 'doorMaterial':
            const doorMaterial = card.querySelector('.door-material-select')?.value || '';
            if (doorMaterial) {
                output += `Material: ${doorMaterial}\n\n`;
            } else {
                missingFields.push('Material');
                output += `Material: [NOT SPECIFIED]\n\n`;
            }
            break;
            
        case 'doorDimensions':
            let dimensions = card.querySelector('.door-size-select')?.value || '';
            const customDimension = card.querySelector('.door-custom-dimension')?.value.trim() || '';
            if (customDimension) {
                const formatted = formatDimension(customDimension);
                if (formatted) {
                    dimensions = formatted;
                }
            }
            const doorThickness = card.querySelector('.door-thickness-select')?.value || '';
            
            if (dimensions) {
                output += `Dimensions: ${dimensions}\n`;
            } else {
                missingFields.push('Dimensions');
                output += `Dimensions: [NOT SPECIFIED]\n`;
            }
            if (doorThickness) output += `Thickness: ${doorThickness}\n`;
            output += '\n';
            break;
            
        case 'doorStyle':
            const doorStyle = card.querySelector('.door-style-select')?.value || '';
            if (doorStyle) {
                output += `Style: ${doorStyle}\n\n`;
            }
            break;
            
        case 'glass':
            const glassType = card.querySelector('.door-glass-select')?.value || '';
            if (glassType && glassType !== 'None') {
                output += `Glass: ${glassType}\n\n`;
            }
            break;
            
        case 'handing':
            const handingSwing = card.querySelector('.door-handing-select')?.value || '';
            if (handingSwing) {
                output += `Handing/Swing: ${handingSwing}\n\n`;
            }
            break;
            
        case 'jamb':
            const jambDepth = card.querySelector('.door-jamb-depth-select')?.value || '';
            const jambNotes = card.querySelector('.door-jamb-notes')?.value || '';
            if (jambDepth || jambNotes) {
                output += 'JAMB / FRAME\n';
                if (jambDepth) output += `  Depth: ${jambDepth}\n`;
                if (jambNotes) output += `  Notes: ${jambNotes}\n`;
                output += '\n';
            }
            break;
            
        case 'hinges':
            const hingeCount = card.querySelector('.door-hinge-count')?.value || '';
            const hingeSize = card.querySelector('.door-hinge-size-select')?.value || '';
            const hingeStyle = card.querySelector('.door-hinge-style-select')?.value || '';
            const hingeColor = card.querySelector('.door-hinge-color-select')?.value || '';
            const hingeLocations = card.querySelector('.door-hinge-locations')?.value || '';
            const hingeNotes = card.querySelector('.door-hinge-notes')?.value || '';
            
            if (hingeCount || hingeSize || hingeStyle || hingeColor || hingeLocations || hingeNotes) {
                output += 'HINGES\n';
                if (hingeCount) output += `  Quantity: (${hingeCount}) hinges\n`;
                if (hingeSize) output += `  Size: ${hingeSize}\n`;
                if (hingeStyle) output += `  Style: ${hingeStyle}\n`;
                if (hingeColor) output += `  Color: ${hingeColor}\n`;
                if (hingeLocations) output += `  Locations: ${hingeLocations}\n`;
                if (hingeNotes) output += `  Notes: ${hingeNotes}\n`;
                output += '\n';
            }
            break;
            
        case 'hardware':
            const lockBore = card.querySelector('.door-lock-bore-select')?.value || '';
            const backset = card.querySelector('.door-backset-select')?.value || '';
            const deadboltPrep = card.querySelector('.door-deadbolt-prep')?.checked || false;
            const hardwareNotes = card.querySelector('.door-hardware-notes')?.value || '';
            const hardwareFinish = card.querySelector('.door-hardware-finish-select')?.value || '';
            
            if (lockBore || backset || deadboltPrep || hardwareNotes || hardwareFinish) {
                output += 'HARDWARE PREP\n';
                if (lockBore) output += `  Lock Bore: ${lockBore}\n`;
                if (backset) output += `  Backset: ${backset}\n`;
                if (deadboltPrep) output += `  Deadbolt Prep: Yes\n`;
                if (hardwareFinish) output += `  Hardware Finish: ${hardwareFinish}\n`;
                if (hardwareNotes) output += `  Notes: ${hardwareNotes}\n`;
                output += '\n';
            }
            break;
            
        case 'finish':
            const doorFinish = card.querySelector('.door-finish-select')?.value || '';
            if (doorFinish) {
                output += `Finish: ${doorFinish}\n\n`;
            }
            break;
    }
    
    return output;
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
        const doorId = card.dataset.doorId;
        
        quoteText += '\n' + '─'.repeat(60) + '\n';
        quoteText += `  DOOR CONFIGURATION #${doorNum}\n`;
        quoteText += '─'.repeat(60) + '\n\n';
        
        // Get quantity
        const quantity = card.querySelector('.door-quantity-input')?.value || '1';
        
        // Get modules in order from the DOM
        const modules = card.querySelectorAll('.form-section-compact[data-module-id]');
        const missingFields = [];
        
        // Process each module in the order they appear
        modules.forEach(moduleSection => {
            const moduleId = moduleSection.dataset.moduleId;
            const moduleOutput = generateModuleOutput(moduleId, card, missingFields);
            if (moduleOutput) {
                quoteText += moduleOutput;
            }
        });
        
        // Store missing fields for this door
        if (missingFields.length > 0) {
            if (!window.doorMissingFields) window.doorMissingFields = {};
            window.doorMissingFields[doorNum] = missingFields;
        } else {
            if (window.doorMissingFields) {
                delete window.doorMissingFields[doorNum];
            }
        }
        
        // Quantity
        quoteText += `\nQUANTITY: ${quantity} unit(s)\n\n`;
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Save/Load Configuration Functions
function openSaveConfigDialog() {
    // Create a styled save dialog
    const dialogHTML = `
        <div id="saveConfigDialog" class="custom-dialog active">
            <div class="custom-dialog-content" style="max-width: 450px;">
                <div class="dialog-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0; color: var(--text-primary);"><span style="font-size: 1.5rem;">💾</span> Save Configuration</h3>
                    <button onclick="closeSaveConfigDialog()" style="background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; padding: 0; width: 30px; height: 30px;">&times;</button>
                </div>
                <div style="margin-bottom: 1.5rem; text-align: left;">
                    <label style="display: block; color: var(--text-primary); margin-bottom: 0.5rem; font-weight: 500;">Enter a name for this configuration:</label>
                    <input type="text" id="configNameInput" placeholder="e.g., Main Floor Doors" 
                        style="width: 100%; padding: 0.75rem; background: var(--input-bg); border: 2px solid var(--border-color); border-radius: 6px; color: var(--text-primary); font-size: 1rem; box-sizing: border-box;"
                        onkeypress="if(event.key==='Enter') document.getElementById('saveConfigBtn').click();">
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="closeSaveConfigDialog()" class="dialog-btn dialog-btn-secondary">Cancel</button>
                    <button id="saveConfigBtn" onclick="doSaveConfiguration()" class="dialog-btn dialog-btn-primary">OK</button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing dialog if any
    const existing = document.getElementById('saveConfigDialog');
    if (existing) existing.remove();
    
    document.body.insertAdjacentHTML('beforeend', dialogHTML);
    
    // Focus input
    setTimeout(() => {
        document.getElementById('configNameInput')?.focus();
    }, 100);
}

function closeSaveConfigDialog() {
    const dialog = document.getElementById('saveConfigDialog');
    if (dialog) dialog.remove();
}

function doSaveConfiguration() {
    const input = document.getElementById('configNameInput');
    const configName = input?.value.trim();
    
    if (!configName) {
        input?.focus();
        return;
    }
    
    closeSaveConfigDialog();
    saveConfiguration(configName);
}

function saveConfiguration(name) {
    const config = {
        name: name,
        timestamp: new Date().toISOString(),
        projectInfo: {
            customerName: document.getElementById('customerName')?.value || '',
            projectName: document.getElementById('projectName')?.value || '',
            projectAddress: document.getElementById('projectAddress')?.value || ''
        },
        doors: []
    };
    
    // Save each door configuration
    const doorCards = document.querySelectorAll('.door-config-card');
    doorCards.forEach((card, index) => {
        const doorId = card.dataset.doorId;
        const modules = Array.from(card.querySelectorAll('.form-section-compact[data-module-id]')).map(m => m.dataset.moduleId);
        
        const doorData = {
            doorId: doorId,
            collapsed: card.classList.contains('collapsed'),
            modules: modules,
            values: {}
        };
        
        // Save all input values
        card.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.type === 'checkbox') {
                doorData.values[input.className] = input.checked;
            } else {
                doorData.values[input.className] = input.value;
            }
        });
        
        config.doors.push(doorData);
    });
    
    // Save to localStorage
    const savedConfigs = JSON.parse(localStorage.getItem('doorConfigurations') || '[]');
    savedConfigs.push(config);
    localStorage.setItem('doorConfigurations', JSON.stringify(savedConfigs));
    
    showToast(`Configuration "${name}" saved successfully!`, 'success');
}

function openLoadConfigDialog() {
    const savedConfigs = JSON.parse(localStorage.getItem('doorConfigurations') || '[]');
    
    if (savedConfigs.length === 0) {
        showToast('No saved configurations found', 'info');
        return;
    }
    
    // Create a custom dialog with list of configs
    const configList = savedConfigs.map((config, index) => {
        const date = new Date(config.timestamp).toLocaleString();
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--tertiary-bg); border-radius: 6px; margin-bottom: 0.5rem;">
                <div>
                    <div style="font-weight: 600; color: var(--accent-color);">${config.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">${date} • ${config.doors.length} door(s)</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-secondary" onclick="loadConfiguration(${index}); closeConfigListDialog();" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Load</button>
                    <button class="btn-secondary" onclick="deleteConfiguration(${index});" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; background: var(--danger-color);">Delete</button>
                </div>
            </div>
        `;
    }).join('');
    
    const dialogHTML = `
        <div id="configListDialog" class="custom-dialog active" style="z-index: 50000;">
            <div class="custom-dialog-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <div class="dialog-header" style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 2px solid var(--border-color); margin-bottom: 1rem;">
                    <h3 style="margin: 0; color: var(--text-primary);"><span style="font-size: 1.5rem;">📂</span> Load Configuration</h3>
                    <button onclick="closeConfigListDialog()" style="background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; padding: 0; width: 30px; height: 30px;">&times;</button>
                </div>
                <div style="padding: 0 0.5rem;">
                    ${configList}
                </div>
            </div>
        </div>
    `;
    
    // Remove existing dialog if any
    const existing = document.getElementById('configListDialog');
    if (existing) existing.remove();
    
    document.body.insertAdjacentHTML('beforeend', dialogHTML);
}

function closeConfigListDialog() {
    const dialog = document.getElementById('configListDialog');
    if (dialog) dialog.remove();
}

function loadConfiguration(index) {
    const savedConfigs = JSON.parse(localStorage.getItem('doorConfigurations') || '[]');
    const config = savedConfigs[index];
    
    if (!config) {
        showToast('Configuration not found', 'error');
        return;
    }
    
    // Clear existing doors
    const container = document.getElementById('doorConfigurationsContainer');
    container.innerHTML = '';
    doorConfigCount = 0;
    doorModules.clear();
    
    // Load project info
    if (config.projectInfo) {
        document.getElementById('customerName').value = config.projectInfo.customerName || '';
        document.getElementById('projectName').value = config.projectInfo.projectName || '';
        document.getElementById('projectAddress').value = config.projectInfo.projectAddress || '';
    }
    
    // Load each door
    config.doors.forEach(doorData => {
        addDoorConfiguration();
        const card = container.lastElementChild;
        
        // Add modules in order
        doorData.modules.forEach(moduleId => {
            addModuleToDoor(doorConfigCount.toString(), moduleId, true);
        });
        
        // Restore values
        setTimeout(() => {
            Object.keys(doorData.values).forEach(className => {
                const input = card.querySelector(`.${className}`);
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = doorData.values[className];
                    } else {
                        input.value = doorData.values[className];
                    }
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
            
            // Restore collapsed state
            if (doorData.collapsed) {
                card.classList.add('collapsed');
                updateDoorSummary(card);
            }
        }, 100);
    });
    
    showToast(`Configuration "${config.name}" loaded successfully!`, 'success');
    autoGenerateQuote();
}

function deleteConfiguration(index) {
    const savedConfigs = JSON.parse(localStorage.getItem('doorConfigurations') || '[]');
    const config = savedConfigs[index];
    
    showDialog(`Delete configuration "${config.name}"?`, 'confirm', '🗑️').then(confirmed => {
        if (confirmed) {
            savedConfigs.splice(index, 1);
            localStorage.setItem('doorConfigurations', JSON.stringify(savedConfigs));
            showToast('Configuration deleted', 'success');
            
            // Refresh the dialog
            closeConfigListDialog();
            if (savedConfigs.length > 0) {
                openLoadConfigDialog();
            }
        }
    });
}

// Tooltip positioning system
function positionTooltip(infoIcon) {
    const tooltip = infoIcon.querySelector('.tooltip');
    if (!tooltip) return;
    
    const iconRect = infoIcon.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get tooltip dimensions (it's already visible via CSS :hover)
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Default position: to the right of the icon
    let left = iconRect.right + 10;
    let top = iconRect.top;
    
    // If tooltip would overflow right edge, position to the left
    if (left + tooltipRect.width > viewportWidth - 20) {
        left = iconRect.left - tooltipRect.width - 10;
    }
    
    // If tooltip would overflow left edge (sidebar too narrow), position to the right of sidebar
    if (left < 20) {
        left = Math.min(iconRect.right + 10, viewportWidth - tooltipRect.width - 20);
        // If still not enough space, position below
        if (left < 20) {
            left = 20;
            top = iconRect.bottom + 10;
        }
    }
    
    // If tooltip would overflow bottom, position above
    if (top + tooltipRect.height > viewportHeight - 20) {
        top = Math.max(20, iconRect.top - tooltipRect.height - 10);
    }
    
    // If tooltip would overflow top, position at top with margin
    if (top < 20) {
        top = 20;
    }
    
    // Only set position, let CSS handle visibility
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

// Add event listeners to all info icons for dynamic positioning
document.addEventListener('DOMContentLoaded', () => {
    // Use event delegation for dynamically added elements
    document.addEventListener('mouseenter', (e) => {
        const infoIcon = e.target.closest('.info-icon');
        if (infoIcon) {
            // Position tooltip immediately on hover
            requestAnimationFrame(() => positionTooltip(infoIcon));
        }
    }, true);
    
    // Clean up inline styles on mouse leave
    document.addEventListener('mouseleave', (e) => {
        const infoIcon = e.target.closest('.info-icon');
        if (infoIcon) {
            const tooltip = infoIcon.querySelector('.tooltip');
            if (tooltip) {
                // Remove inline styles so CSS :hover can work properly
                tooltip.style.removeProperty('visibility');
                tooltip.style.removeProperty('opacity');
            }
        }
    }, true);
    
    // Reposition on scroll to keep tooltips aligned
    const scrollHandler = () => {
        const hoveredIcons = document.querySelectorAll('.info-icon:hover');
        hoveredIcons.forEach(icon => positionTooltip(icon));
    };
    
    document.querySelector('.module-sidebar')?.addEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', scrollHandler);
});




