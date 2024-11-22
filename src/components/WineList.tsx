// WineList.tsx
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  Collection,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Pagination,
  SearchField,
  SelectField
} from '@aws-amplify/ui-react';

const WineList = () => {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ region: '', variety: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const client = generateClient();

  useEffect(() => {
    fetchWines();
  }, []);

  const fetchWines = async () => {
    try {
      const wineData = await client.models.Wine.list({
        limit: 1000 // Adjust based on your needs
      });
      setWines(wineData.items);
    } catch (error) {
      console.error('Error fetching wines:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWines = wines
    .filter(wine => {
      const matchesSearch = searchQuery === '' || 
        wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wine.producer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRegion = filter.region === '' || wine.region === filter.region;
      const matchesVariety = filter.variety === '' || wine.grapeVariety === filter.variety;
      
      return matchesSearch && matchesRegion && matchesVariety;
    })
    .sort((a, b) => b.vintage - a.vintage);

  const pageCount = Math.ceil(filteredWines.length / itemsPerPage);
  const paginatedWines = filteredWines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="filters-container">
        <SearchField
          label="Search wines"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SelectField
          label="Filter by Region"
          onChange={(e) => setFilter(prev => ({ ...prev, region: e.target.value }))}
        >
          <option value="">All Regions</option>
          {Object.keys(WINE_REGIONS).map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </SelectField>
      </div>

      <Table
        highlightOnHover={true}
        variation="striped"
      >
        <TableHead>
          <TableRow>
            <TableCell as="th">Wine</TableCell>
            <TableCell as="th">Producer</TableCell>
            <TableCell as="th">Vintage</TableCell>
            <TableCell as="th">Region</TableCell>
            <TableCell as="th">Variety</TableCell>
            <TableCell as="th">Quantity</TableCell>
            <TableCell as="th">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedWines.map((wine) => (
            <TableRow key={wine.id}>
              <TableCell>{wine.name}</TableCell>
              <TableCell>{wine.producer}</TableCell>
              <TableCell>{wine.vintage}</TableCell>
              <TableCell>{wine.region}</TableCell>
              <TableCell>{wine.grapeVariety}</TableCell>
              <TableCell>{wine.quantity}</TableCell>
              <TableCell>
                {/* Add edit/delete actions */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onNext={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
        onPrevious={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        onChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </div>
  );
};

export default WineList;