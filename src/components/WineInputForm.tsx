import { useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../amplify/data/resource';
import {
  Card, TextField, SelectField, Button, View,
  Heading, Flex, Text, TextAreaField
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Add at the top of WineInputForm.tsx
interface WineFormData {
    name: string;
    producer: string;
    vintage: string;
    region: string;
    subRegion?: string;
    grapeVariety: string;
    blendComposition?: string;
    quantity: string;
    bottleSize: string;
    purchaseDate?: string;
    estimatedValue?: string;
    storageLocation?: string;
    tastingNotes?: string;
    criticsScores?: string;
    allocationStatus?: string;
  }
  
  // Update the reset functionality in handleSubmit
  const resetForm = () => {
    setWine({
      name: "",
      producer: "",
      vintage: new Date().getFullYear().toString(),
      region: "",
      subRegion: "",
      grapeVariety: "",
      blendComposition: "",
      quantity: "1",
      bottleSize: "750",
      purchaseDate: "",
      estimatedValue: "",
      storageLocation: "",
      tastingNotes: "",
      criticsScores: "",
      allocationStatus: ""
    });
    setErrors({});
    setTouched({});
  };
  
  // Update the submit button
  <Button 
    type="submit"
    isLoading={loading}
    loadingText="Adding Wine..."
    style={{
      backgroundColor: '#8B1B1B',
      color: 'white',
      padding: '1rem',
      fontSize: '1.1rem',
      marginTop: '1rem',
      width: '100%',
      ':hover': {
        backgroundColor: '#631313'
      }
    }}
  >
    Add Wine to Collection
  </Button>
  
  {/* Add feedback messages */}
  {success && (
    <View 
      backgroundColor="rgba(0, 200, 0, 0.1)"
      padding="1rem"
      borderRadius="medium"
      marginTop="1rem"
    >
      <Text color="green">Wine successfully added to your collection!</Text>
    </View>
  )}
  
  {error && (
    <View 
      backgroundColor="rgba(200, 0, 0, 0.1)"
      padding="1rem"
      borderRadius="medium"
      marginTop="1rem"
    >
      <Text color="red">{error}</Text>
    </View>
  )}

const client = generateClient<Schema>();

// Constants for dropdowns
const WINE_REGIONS = {
  'France': ['Bordeaux', 'Burgundy', 'Champagne', 'Loire', 'Rhone'],
  'Italy': ['Tuscany', 'Piedmont', 'Veneto', 'Barolo'],
  'USA': ['Napa Valley', 'Sonoma', 'Oregon', 'Washington'],
  'Spain': ['Rioja', 'Ribera del Duero', 'Priorat']
};

const GRAPE_VARIETIES = {
  'Red': ['Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Syrah', 'Sangiovese'],
  'White': ['Chardonnay', 'Sauvignon Blanc', 'Riesling', 'Pinot Grigio'],
  'Sparkling': ['Chardonnay', 'Pinot Noir', 'Pinot Meunier']
};

const BOTTLE_SIZES = [
  { value: '375', label: '375ml (Half)' },
  { value: '750', label: '750ml (Standard)' },
  { value: '1500', label: 'Magnum (1.5L)' },
  { value: '3000', label: 'Double Magnum (3L)' }
];

const RequiredLabel = ({ children }) => (
  <Flex alignItems="center">
    {children}
    <Text color="#8B1B1B" marginLeft="4px">*</Text>
  </Flex>
);

// Add this before the WineInputForm component
const VALIDATION_RULES = {
  vintage: {
    min: 1900,
    max: new Date().getFullYear(),
  },
  quantity: {
    min: 1,
    max: 999,
  },
  bottleSize: {
    validSizes: [375, 750, 1500, 3000, 6000], // in ml
  },
  estimatedValue: {
    min: 0,
    max: 1000000,
  }
};

const validateWine = (wine) => {
  const errors = {};

  // Vintage validation
  const vintageYear = parseInt(wine.vintage);
  if (vintageYear < VALIDATION_RULES.vintage.min || vintageYear > VALIDATION_RULES.vintage.max) {
    errors.vintage = `Vintage must be between ${VALIDATION_RULES.vintage.min} and ${VALIDATION_RULES.vintage.max}`;
  }

  // Quantity validation
  const quantity = parseInt(wine.quantity);
  if (quantity < VALIDATION_RULES.quantity.min || quantity > VALIDATION_RULES.quantity.max) {
    errors.quantity = `Quantity must be between ${VALIDATION_RULES.quantity.min} and ${VALIDATION_RULES.quantity.max}`;
  }

  // Required fields validation
  const requiredFields = ['name', 'producer', 'vintage', 'region', 'grapeVariety', 'quantity', 'bottleSize'];
  requiredFields.forEach(field => {
    if (!wine[field]) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  return errors;
};

const WineInputForm = () => {
  const [wine, setWine] = useState({
    name: "",
    producer: "",
    vintage: new Date().getFullYear().toString(),
    region: "",
    subRegion: "",
    grapeVariety: "",
    blendComposition: "",
    quantity: "1",
    bottleSize: "750",
    purchaseDate: "",
    estimatedValue: "",
    storageLocation: "",
    tastingNotes: "",
    criticsScores: "",
    allocationStatus: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWine(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field on change
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'vintage':
        const year = parseInt(value);
        if (year < VALIDATION_RULES.vintage.min || year > VALIDATION_RULES.vintage.max) {
          return `Vintage must be between ${VALIDATION_RULES.vintage.min} and ${VALIDATION_RULES.vintage.max}`;
        }
        break;
      case 'quantity':
        const qty = parseInt(value);
        if (qty < VALIDATION_RULES.quantity.min || qty > VALIDATION_RULES.quantity.max) {
          return `Quantity must be between ${VALIDATION_RULES.quantity.min} and ${VALIDATION_RULES.quantity.max}`;
        }
        break;
      // Add more field validations as needed
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = validateWine(wine);
    setErrors(validationErrors);
    
    // If there are errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      setError('Please fix the validation errors before submitting.');
      return;
    }

    setLoading(true);
    try {
      // Format data for submission
      const wineData = {
        name: wine.name,
        producer: wine.producer,
        vintage: parseInt(wine.vintage),
        region: wine.region,
        subRegion: wine.subRegion || null,
        grapeVariety: wine.grapeVariety,
        blendComposition: wine.blendComposition || null,
        quantity: parseInt(wine.quantity),
        bottleSize: parseInt(wine.bottleSize),
        purchaseDate: wine.purchaseDate || null,
        estimatedValue: wine.estimatedValue ? parseFloat(wine.estimatedValue) : null,
        storageLocation: wine.storageLocation || null,
        tastingNotes: wine.tastingNotes || null,
        criticsScores: wine.criticsScores || null,
      };

      // Submit to database
      const newWine = await client.models.Wine.create(wineData);
      console.log('Wine added:', newWine);

      // Clear form
      setWine({
        name: "",
        producer: "",
        vintage: new Date().getFullYear().toString(),
        region: "",
        subRegion: "",
        grapeVariety: "",
        blendComposition: "",
        quantity: "1",
        bottleSize: "750",
        purchaseDate: "",
        estimatedValue: "",
        storageLocation: "",
        tastingNotes: "",
        criticsScores: "",
        allocationStatus: ""
      });

      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      console.error('Error adding wine:', error);
      setError('Failed to add wine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  return (
    <View style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(180deg, rgb(117, 81, 194), rgb(255, 255, 255))'
    }}>
      <Card variation="elevated" 
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Heading level={1} style={{
          color: '#8B1B1B',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Add Wine to Collection
        </Heading>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="1.5rem">
            {/* Basic Information */}
            <Flex direction="column" gap="1rem">
              <Heading level={3}>Basic Information</Heading>
              <TextField
                label={<RequiredLabel>Wine Name</RequiredLabel>}
                name="name"
                value={wine.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                hasError={touched.name && errors.name}
                errorMessage={touched.name && errors.name}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              />
              <TextField
                label={<RequiredLabel>Producer</RequiredLabel>}
                name="producer"
                value={wine.producer}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                hasError={touched.producer && errors.producer}
                errorMessage={touched.producer && errors.producer}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              />
              <TextField
                label={<RequiredLabel>Vintage</RequiredLabel>}
                name="vintage"
                type="number"
                value={wine.vintage}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                hasError={touched.vintage && errors.vintage}
                errorMessage={touched.vintage && errors.vintage}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              />
            </Flex>

            {/* Region Information */}
            <Flex direction="column" gap="1rem">
              <Heading level={3}>Region</Heading>
              <SelectField
                label={<RequiredLabel>Region</RequiredLabel>}
                name="region"
                value={wine.region}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                hasError={touched.region && errors.region}
                errorMessage={touched.region && errors.region}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              >
                <option value="">Select Region</option>
                {Object.keys(WINE_REGIONS).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </SelectField>

              <SelectField
                label="Sub-Region"
                name="subRegion"
                value={wine.subRegion}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!wine.region}
                hasError={touched.subRegion && errors.subRegion}
                errorMessage={touched.subRegion && errors.subRegion}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              >
                <option value="">Select Sub-Region</option>
                {wine.region && WINE_REGIONS[wine.region]?.map(subRegion => (
                  <option key={subRegion} value={subRegion}>{subRegion}</option>
                ))}
              </SelectField>
            </Flex>

            {/* Wine Details */}
            <Flex direction="column" gap="1rem">
              <Heading level={3}>Wine Details</Heading>
              <SelectField
                label={<RequiredLabel>Grape Variety</RequiredLabel>}
                name="grapeVariety"
                value={wine.grapeVariety}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                hasError={touched.grapeVariety && errors.grapeVariety}
                errorMessage={touched.grapeVariety && errors.grapeVariety}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              >
                <option value="">Select Variety</option>
                {Object.entries(GRAPE_VARIETIES).map(([type, varieties]) => (
                  <optgroup key={type} label={type}>
                    {varieties.map(variety => (
                      <option key={variety} value={variety}>{variety}</option>
                    ))}
                  </optgroup>
                ))}
              </SelectField>

              <TextField
                label="Blend Composition"
                name="blendComposition"
                value={wine.blendComposition}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., 80% Cabernet Sauvignon, 20% Merlot"
                hasError={touched.blendComposition && errors.blendComposition}
                errorMessage={touched.blendComposition && errors.blendComposition}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              />
            </Flex>

            {/* Purchase Information */}
            <Flex direction="column" gap="1rem">
              <Heading level={3}>Purchase Information</Heading>
              <TextField
                label={<RequiredLabel>Quantity</RequiredLabel>}
                name="quantity"
                type="number"
                value={wine.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                hasError={touched.quantity && errors.quantity}
                errorMessage={touched.quantity && errors.quantity}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              />

              <SelectField
                label={<RequiredLabel>Bottle Size</RequiredLabel>}
                name="bottleSize"
                value={wine.bottleSize}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                hasError={touched.bottleSize && errors.bottleSize}
                errorMessage={touched.bottleSize && errors.bottleSize}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              >
                {BOTTLE_SIZES.map(size => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </SelectField>

              <TextField
                label="Purchase Date"
                name="purchaseDate"
                type="date"
                value={wine.purchaseDate}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={touched.purchaseDate && errors.purchaseDate}
                errorMessage={touched.purchaseDate && errors.purchaseDate}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              />
            </Flex>

            {/* Additional Information */}
            <Flex direction="column" gap="1rem">
              <Heading level={3}>Additional Information</Heading>
              <TextAreaField
                label="Tasting Notes"
                name="tastingNotes"
                value={wine.tastingNotes}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                hasError={touched.tastingNotes && errors.tastingNotes}
                errorMessage={touched.tastingNotes && errors.tastingNotes}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              />

              <TextField
                label="Critics Scores"
                name="criticsScores"
                value={wine.criticsScores}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., RP 95, WS 93"
                hasError={touched.criticsScores && errors.criticsScores}
                errorMessage={touched.criticsScores && errors.criticsScores}
                style={{
                  '--amplify-components-field-error-color': '#8B1B1B'
                }}
              />
            </Flex>

            <Button type="submit"
              style={{
                backgroundColor: '#8B1B1B',
                color: 'white',
                padding: '1rem',
                fontSize: '1.1rem',
                marginTop: '1rem'
              }}
            >
              Add Wine to Collection
            </Button>
          </Flex>
        </form>
      </Card>
    </View>
  );
};

export default WineInputForm;