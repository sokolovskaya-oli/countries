"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../../graphql/queries";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  background-color: ${({ theme }) => theme.cardBackground || "#f9f9f9"};
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Detail = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  line-height: 1.5;
`;

export default function CountryDetailPage() {
  const { code } = useParams();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data.country;
  console.log(country);

  return (
    <Container>
      <Title>
        {country.name} {country.emoji}
      </Title>
      <Detail>Native: {country.native}</Detail>
      <Detail>Capital: {country.capital}</Detail>
      <Detail>Currency: {country.currency}</Detail>
      <Detail>Phone: +{country.phone}</Detail>
      <Detail>Continent: {country.continent.name}</Detail>
    </Container>
  );
}
