"use client";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_COUNTRIES } from "../graphql/queries";
import styled from "styled-components";

const TableWrapper = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.hover};
  color: ${({ theme }) => theme.text};
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;
export default function CountriesPage() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TableWrapper>
      <Title>Countries</Title>
      <StyledTable>
        <thead>
          <tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>Continent</Th>
          </tr>
        </thead>
        <tbody>
          {data.countries.map((country) => (
            <Tr key={country.code}>
              <Td>
                <Link href={`/countries/${country.code}`}>{country.code}</Link>
              </Td>
              <Td>{country.name}</Td>
              <Td>{country.continent.name}</Td>
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}
