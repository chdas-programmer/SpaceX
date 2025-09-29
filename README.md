# SpaceX

🚀 **SpaceX Project**

A modern, interactive web application built with cutting-edge technologies to explore and visualize data.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-None-lightgrey)
![Stars](https://img.shields.io/github/stars/chdas-programmer/SpaceX?style=social)
![Forks](https://img.shields.io/github/forks/chdas-programmer/SpaceX?style=social)

![Project Preview Image](https://github.com/chdas-programmer/SpaceX/blob/main/Images/image2.png)
![Project Preview Image](https://github.com/chdas-programmer/SpaceX/blob/main/Images/image1.png)
![Project Preview Image](https://github.com/chdas-programmer/SpaceX/blob/main/Images/image.png)


## 🛠️ Installation Guide

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

*   Node.js (LTS version recommended)
*   npm or Yarn package manager

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/chdas-programmer/SpaceX.git
cd SpaceX
```

### Install Dependencies

Install the necessary project dependencies using your preferred package manager:

```bash
# Using npm
npm install

# Or using Yarn
# yarn install
```



### Run the Development Server

Once dependencies are installed and environment variables are configured, start the development server:

```bash
# Using npm
npm run dev

# Or using Yarn
# yarn dev
```

The application should now be running locally, typically accessible at `http://localhost:5173` (or another port specified by Vite).


## 🚀 Usage Examples

After successfully installing and running the application, you can access it via your web browser. Interact with the UI components, forms, and data visualizations to explore its functionalities.

### Basic Interaction

Navigate through the application's pages using the navigation menu. Experiment with input fields and submit forms to see data handling in action.

```typescript
// Example of a component using a Radix UI button
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui or similar setup

function MyComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <Button onClick={handleClick}>
      Click Me
    </Button>
  );
}
```

### Configuration Options

Specific components or features might offer configuration options. Refer to the `src/` directory for component-specific documentation or inline comments.

| Option      | Type    | Description                                      | Default Value |
| :---------- | :------ | :----------------------------------------------- | :------------ |
| `theme`     | `string`| Sets the UI theme (`light`, `dark`, `system`).   | `system`      |
| `animation` | `boolean`| Enables or disables UI animations.               | `true`        |





*   ## 📌 Features Implemented
- ✅ **Mission Listing** – Display missions in a grid/card layout.  
- ✅ **Mission Details** – Click a mission to view detailed info in a modal.  
- ✅ **Search & Filters** – Search by mission name and apply filters.  
- ✅ **Pagination** – Efficiently navigate through mission results.  
- ✅ **Favorites** – Mark/unmark missions as favorites (stored in context).  
- ✅ **Dark/Light Mode** – Toggle between themes.  
- ✅ **Loading Skeletons** – Smooth loading states with skeleton screens.  
- ✅ **Error Handling** – Graceful error messages for API failures.  
- ✅ **Reusable Components** – Clean and modular UI components.  
- ✅ **Custom Hooks** – Debounce, theming, and SpaceX data fetching hooks. 


## 🤝 Contribution Guidelines

We welcome contributions to the SpaceX project! To ensure a smooth collaboration, please follow these guidelines:

### Code Style

*   Adhere to the existing code style. We use ESLint and Prettier for code formatting. Please ensure your code passes lint checks.
*   Run `npm run lint` and `npm run format` before committing.

### Branch Naming Conventions

*   Use a descriptive branch name based on the type of work:
    *   `feature/your-feature-name` for new features.
    *   `bugfix/issue-description` for bug fixes.
    *   `refactor/area-of-change` for code refactoring.
    *   `docs/documentation-update` for documentation changes.

### Pull Request Process

1.  **Fork** the repository.
2.  **Create a new branch** from `main`.
3.  **Make your changes**, ensuring they align with the project's goals.
4.  **Test your changes** thoroughly.
5.  **Commit your changes** with a clear and concise message.
6.  **Push your branch** to your forked repository.
7.  **Open a Pull Request** to the `main` branch of the original repository.
8.  **Provide a detailed description** of your changes in the PR.
9.  Be responsive to feedback and make necessary adjustments.

### Testing Requirements

*   New features should ideally be accompanied by relevant unit or integration tests.
*   Ensure all existing tests pass before submitting a pull request.


## 📜 License Information

This project currently does **not have a specific open-source license** defined.

By default, without an explicit license, standard copyright law applies, meaning all rights are reserved by the copyright holder (`chdas-programmer`). This typically restricts others from using, reproducing, distributing, or creating derivative works from the project's code.

For any specific usage or licensing inquiries, please contact the main contributor, `chdas-programmer`.
