import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { publishRecipeAPI } from "../api-calls/apiCalls";
import { toast } from "react-toastify";
import { categories } from "../data";
import { subCategories } from "../data";

import { useNavigate} from 'react-router-dom';

const PublishRecipe = () => {

  const navigate = useNavigate();

  const [recipeName, setRecipeName] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState("");
  const [picture, setPicture] = useState(null);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      recipeName !== "" &&
      summary !== "" &&
      category !== "" &&
      subcategory !== "" &&
      ingredients !== [] &&
      method !== "" &&
      picture !== null
    ) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('recipeName', recipeName);
      formData.append('summary', summary);
      formData.append('category', category);
      formData.append('subcategory', subcategory);
      formData.append('ingredients', JSON.stringify(ingredients));
      formData.append('method', method);
      formData.append('picture', picture);
      const success = await publishRecipeAPI(formData);
      if (success) {
        toast("Recipe Publishment Successful");
        navigate('/');
      } else {
        toast("Recipe Publishment Failed");
      }
    } else {
      toast("All the fields are important");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3 theme-color">Recipe Publishing</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipeName">
          <Form.Label className="f-b">Recipe Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="summary">
          <Form.Label className="f-b">Summary</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label className="f-b">Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-3"
          >
            <option value="">Select Category</option>
            {categories.map((e, i) => {
              return (
                <option key={i} value={e}>
                  {e}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        {category && (
          <Form.Group controlId="subcategory">
            <Form.Label className="f-b">Subcategory</Form.Label>
            <Form.Control
              as="select"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="mb-3"
            >
              <option value="">Select Subcategory</option>
              {subCategories[category].map((e, i) => {
                return (
                  <option key={i} value={e}>
                    {e}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        )}

        <Form.Group controlId="ingredients">
          <Form.Label className="f-b">Ingredients</Form.Label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder={`Enter Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="m-3"
              />
            </div>
          ))}
          <Button
            className="m-3 f-b"
            variant="danger"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </Button>
        </Form.Group>

        <Form.Group controlId="method">
          <Form.Label className="f-b">Method</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter Method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label className="f-b">Upload Picture</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setPicture(e.target.files[0])}
            className="mb-3"
          />
        </Form.Group>

        <Button variant="danger" type="submit" className="mb-3">
          Publish Recipe
        </Button>
      </Form>
    </div>
  );
};

export default PublishRecipe;
