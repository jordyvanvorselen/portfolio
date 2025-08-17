#!/bin/bash

# Legacy UI Component Usage Analyzer
# This script helps identify which domain files still use legacy variants

echo "🔍 Analyzing legacy UI component usage in domains..."
echo "=================================================="

# Function to count occurrences
count_usage() {
    local pattern="$1"
    local description="$2"
    local count=$(find src/domains -name "*.tsx" -not -name "*.spec.tsx" -exec grep -l "$pattern" {} \; | wc -l)
    echo "$description: $count files"
}

echo ""
echo "📊 Legacy Variant Usage Summary:"
echo "--------------------------------"

# Title legacy variants
count_usage 'variant="hero-name"' "Title hero-name"
count_usage 'variant="hero-title"' "Title hero-title" 
count_usage 'variant="section-title"' "Title section-title"
count_usage 'variant="footer-author"' "Title footer-author"
count_usage 'variant="blog-' "Title blog variants"
count_usage 'variant="project' "Title project variants"

echo ""

# Text legacy variants  
count_usage 'variant="description"' "Text description"
count_usage 'variant="card-description"' "Text card-description"
count_usage 'variant="footer-' "Text footer variants"
count_usage 'variant="blog-' "Text blog variants"
count_usage 'variant="project' "Text project variants"

echo ""

# Button legacy variants
count_usage 'variant="primary"' "Button primary"
count_usage 'variant="secondary"' "Button secondary" 
count_usage 'variant="github"' "Button github"
count_usage 'variant="demo"' "Button demo"
count_usage 'variant="footer-action"' "Button footer-action"

echo ""

# Badge legacy variants
count_usage 'variant="skill"' "Badge skill"
count_usage 'variant="technology"' "Badge technology"
count_usage 'variant="availability"' "Badge availability"

echo ""

# NavigationLink legacy variants
count_usage 'variant="desktop"' "NavigationLink desktop"
count_usage 'variant="mobile"' "NavigationLink mobile"
count_usage 'variant="footer"' "NavigationLink footer"

echo ""
echo "📁 Files by Domain:"
echo "------------------"

domains=("common" "home/hero" "home/expertise" "blog" "projects")

for domain in "${domains[@]}"; do
    echo ""
    echo "🏠 Domain: $domain"
    files_with_variants=$(find "src/domains/$domain" -name "*.tsx" -not -name "*.spec.tsx" -exec grep -l 'variant=' {} \; 2>/dev/null)
    if [ -n "$files_with_variants" ]; then
        echo "$files_with_variants" | sed 's|src/domains/||g'
    else
        echo "   ✅ No legacy variants found"
    fi
done

echo ""
echo "🛠️  Migration Commands:"
echo "----------------------"
echo "To migrate a specific domain:"
echo "  grep -r 'variant=' src/domains/DOMAIN_NAME/ --include='*.tsx' --exclude='*.spec.tsx'"
echo ""
echo "To see all legacy Title variants in domains:"
echo "  grep -r 'Title.*variant=' src/domains/ --include='*.tsx' --exclude='*.spec.tsx'"
echo ""
echo "To see all legacy Text variants in domains:"  
echo "  grep -r 'Text.*variant=' src/domains/ --include='*.tsx' --exclude='*.spec.tsx'"
echo ""
echo "📖 See MIGRATION_GUIDE.md for complete mapping reference"