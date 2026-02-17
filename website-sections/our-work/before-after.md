# Before & After Transformation Gallery Specifications

## SEO
- **Title Tag:** Before & After Finish Carpentry Transformations | Denver, CO
- **Meta Description:** See the dramatic difference finish carpentry makes. Swipe through our favorite before-and-after projects: doors, trim, and built-ins.
- **Target Keywords:** finish carpentry before and after, home renovation gallery

## Content Strategy
This is the "Proof" page. Pure visual evidence of value. Less text, more interaction (sliders). The goal is to make the user say "Wow, I want that."

### Intro Text
**Headline:** The Power of Details
**Body:** It’s hard to visualize how much a new door style or a wall treatment changes a room—until you see it side-by-side.

## Layout Reference
- **Hero:** Dynamic video or GIF loop of a slider moving back and forth on a major project.
- **List Layout:** Vertical scrolling list of large "Transformation Cards".

## Components to Use
### Transformation Card stack
- **Component:** `TransformationCard`
- **Structure:**
    - Top: Large Before/After Slider.
    - Bottom: Project Details (Location, Scope, "The Problem" vs "The Solution").
    - Action: "Get this Look" button.

### Project Type Filter
- **Component:** `FilterTabs`
- **Options:** All, Doors, Stairs, Built-Ins, Trim

## Design Instructions
- **Visuals:** Ensure "Before" photos are decent quality (not blurry) but effectively show the "dated" nature. "After" photos must be professional quality.
- **Labels:** Clearly label "BEFORE" and "AFTER" on the images themselves if not using a slider with handles.
- **Performance:** Lazy load these heavy image assets.
