// sample recipe data w/ image URLs
const recipes = [
    {
        id: 1,
        title: "Avocado Toast with Poached Egg",
        category: "breakfast",
        diets: ["vegetarian"],
        prepTime: "10 mins",
        cookTime: "5 mins",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "A healthy and delicious breakfast option with creamy avocado and perfectly poached eggs."
    },
    {
        id: 2,
        title: "Vegetable Stir Fry",
        category: "dinner",
        diets: ["vegetarian", "vegan"],
        prepTime: "15 mins",
        cookTime: "10 mins",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Quick and easy vegetable stir fry with a savory sauce."
    },
    {
        id: 3,
        title: "Chocolate Chip Cookies",
        category: "dessert",
        diets: ["vegetarian"],
        prepTime: "15 mins",
        cookTime: "10 mins",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Classic chocolate chip cookies that are soft in the middle and crispy on the edges."
    },
    {
        id: 4,
        title: "Quinoa Salad",
        category: "lunch",
        diets: ["vegetarian", "vegan", "gluten-free"],
        prepTime: "10 mins",
        cookTime: "15 mins",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Healthy quinoa salad with fresh vegetables and a lemon vinaigrette."
    },
    {
        id: 5,
        title: "Beef Tacos",
        category: "dinner",
        diets: [],
        prepTime: "20 mins",
        cookTime: "15 mins",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Flavorful beef tacos with all the fixings for a perfect taco night."
    },
    {
        id: 6,
        title: "Blueberry Pancakes",
        category: "breakfast",
        diets: ["vegetarian"],
        prepTime: "10 mins",
        cookTime: "15 mins",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Fluffy pancakes bursting with fresh blueberries."
    }
];

// user's recipes (for profile page)
const userRecipes = [
    {
        id: 7,
        title: "Homemade Pasta",
        category: "dinner",
        diets: ["vegetarian"],
        prepTime: "30 mins",
        cookTime: "5 mins",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Fresh homemade pasta with a simple tomato basil sauce."
    },
    {
        id: 8,
        title: "Berry Smoothie Bowl",
        category: "breakfast",
        diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
        prepTime: "5 mins",
        cookTime: "0 mins",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Refreshing smoothie bowl topped with fresh berries and granola."
    },
    {
        id: 9,
        title: "Roasted Vegetable Medley",
        category: "dinner",
        diets: ["vegetarian", "vegan", "gluten-free"],
        prepTime: "15 mins",
        cookTime: "25 mins",
        image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Seasonal vegetables roasted to perfection with herbs and olive oil."
    }
];

// ========== function defs ========== //

// function renders recipes to specified container
function renderRecipes(recipesToRender, containerSelector) {
    const container = $(containerSelector);
    container.empty();
    
    if (recipesToRender.length === 0) {
        container.html('<p style="grid-column: 1/-1; text-align: center;">No recipes found matching your filters.</p>');
        return;
    }
    
    recipesToRender.forEach((recipe) => {
        const dietBadges = recipe.diets.map((diet) => 
            `<span class="diet-badge">${diet}</span>`
        ).join('');
        
        const recipeCard = $(`
            <div class="recipe-card" data-id="${recipe.id}" data-category="${recipe.category}" data-diets="${recipe.diets.join(',')}">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-meta">
                        <span>${recipe.prepTime} prep</span>
                        <span>${recipe.cookTime} cook</span>
                    </div>
                    <div class="diet-badges">${dietBadges}</div>
                    <p>${recipe.description}</p>
                    <button class="btn btn-view-recipe">View Recipe</button>
                </div>
            </div>
        `);
        
        // Add click handler for view recipe button
        recipeCard.find('.btn-view-recipe').on('click', function() {
            alert(`Viewing recipe: ${recipe.title}\n\nIn a full implementation, this would show the complete recipe with ingredients and instructions.`);
        });
        
        container.append(recipeCard);
    });
}

// filters recipes based on selected filters
function filterRecipes() {
    const selectedCategory = $('#category-filters .active').data('category');
    const selectedDiet = $('#diet-filters .active').data('diet');
    
    let filteredRecipes = recipes;
    
    // by category
    if (selectedCategory !== 'all') {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.category === selectedCategory);
    }
    
    // by diet
    if (selectedDiet !== 'all') {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.diets.includes(selectedDiet));
    }
    
    renderRecipes(filteredRecipes, '#gallery-recipes');
}

// shows the selected page and hide others
function showPage(pageId) {
    $('.page-content').hide();
    $(`#${pageId}`).show();
    
    // handling for gallery page
    if (pageId === 'gallery') {
        filterRecipes();
    }
}

// shows page based on current hash
function showPageFromHash() {
    const pageId = window.location.hash.substring(1) || 'home';
    showPage(pageId);
    
    // updates active nav link
    $('.nav-link').removeClass('active');
    $(`.nav-link[data-page="${pageId}"]`).addClass('active');
}

// ========== main execution ========== //

$(document).ready(function() {
    // initialize page
    showPageFromHash();
    renderRecipes(recipes.slice(0, 3), '#featured-recipes');
    renderRecipes(recipes, '#gallery-recipes');
    renderRecipes(userRecipes, '#user-recipes');
    
    // handle nav
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const pageId = $(this).data('page');
        window.location.hash = pageId;
        showPage(pageId);
        
        // updates active nav link
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
    
    // handles hash changes (back / forward buttons)
    $(window).on('hashchange', showPageFromHash);
    
    // recipe filtering
    $('.filter-btn').on('click', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        filterRecipes();
    });
    
    // add ingredient
    $('#add-ingredient').on('click', function() {
        const newIngredient = $('<div class="ingredient-item">' +
            '<input type="text" placeholder="Ingredient (e.g., 1 cup flour)" class="form-control" required>' +
            '<button type="button" class="remove-btn">×</button>' +
            '</div>');
        $('#ingredient-list').append(newIngredient);
        newIngredient.find('.remove-btn').on('click', function() {
            $(this).parent().remove();
        });
    });
    
    // add instruction
    $('#add-instruction').on('click', function() {
        const stepCount = $('#instruction-list .instruction-item').length + 1;
        const newInstruction = $('<div class="instruction-item">' +
            `<textarea placeholder="Step ${stepCount}: ..." class="form-control" required></textarea>` +
            '<button type="button" class="remove-btn">×</button>' +
            '</div>');
        $('#instruction-list').append(newInstruction);
        newInstruction.find('.remove-btn').on('click', function() {
            $(this).parent().remove();
        });
    });
    
    // form submission
    $('#recipe-form').on('submit', function(e) {
        e.preventDefault();
        
        // simple validation
        let isValid = true;
        $(this).find('[required]').each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        
        if (isValid) {
            // Create a more professional success message
            const successMessage = $('<div class="success-message" style="background-color: #4CAF50; color: white; padding: 1rem; border-radius: 5px; margin-bottom: 1rem;">' +
                'Recipe submitted successfully! (In a real app, this would save to a database)' +
                '</div>');
            
            // Insert the message before the form
            $(this).before(successMessage);
            
            // Remove the message after 5 seconds
            setTimeout(() => {
                successMessage.fadeOut(500, function() {
                    $(this).remove();
                });
            }, 5000);
            
            this.reset();
            // resets ingredient and instruction lists
            $('#ingredient-list').html('<div class="ingredient-item">' +
                '<input type="text" placeholder="Ingredient (e.g., 1 cup flour)" class="form-control" required>' +
                '<button type="button" class="remove-btn">×</button>' +
                '</div>');
            $('#instruction-list').html('<div class="instruction-item">' +
                '<textarea placeholder="Step 1: ..." class="form-control" required></textarea>' +
                '<button type="button" class="remove-btn">×</button>' +
                '</div>');
        } else {
            // Create a more professional error message
            const errorMessage = $('<div class="error-message" style="background-color: #ff6b6b; color: white; padding: 1rem; border-radius: 5px; margin-bottom: 1rem;">' +
                'Please fill in all required fields' +
                '</div>');
            
            // Insert the message before the form
            $(this).before(errorMessage);
            
            // Remove the message after 5 seconds
            setTimeout(() => {
                errorMessage.fadeOut(500, function() {
                    $(this).remove();
                });
            }, 5000);
        }
    });
    
    // star ratings - improved to highlight all stars up to clicked one
    $('.star').on('click', function() {
        const ratingContainer = $(this).parent();
        const value = $(this).data('value');
        
        // highlights stars up to the clicked one
        ratingContainer.find('.star').each(function() {
            if ($(this).data('value') <= value) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
        
        // in a real app, you would save this to a database
        console.log(`Rated tip ${ratingContainer.data('tip-id')} with ${value} stars`);
    });
    
    // star ratings - hover effect to show what would be selected
    $('.star').on('mouseover', function() {
        const value = $(this).data('value');
        $(this).parent().find('.star').each(function() {
            if ($(this).data('value') <= value) {
                $(this).addClass('hovered');
            } else {
                $(this).removeClass('hovered');
            }
        });
    });
    
    $('.star').on('mouseout', function() {
        $(this).parent().find('.star').removeClass('hovered');
    });
    
    // loads more recipes
    $('#load-more-btn').on('click', function() {
        alert('Loading more recipes... (In a real app, this would fetch from a server)');
    });
    
    // initialize remove buttons
    $('.remove-btn').on('click', function() {
        $(this).parent().remove();
    });
});