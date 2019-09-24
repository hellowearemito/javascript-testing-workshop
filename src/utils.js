import { format } from "date-fns";

export const formatDate = (date, pattern) => {
  if (!date) return;
  return format(new Date(date), pattern);
};

export const isConnectionAllowed = (from, to) => {
  return (
    typeof from.connections !== "undefined" &&
    from.connections.length > 0 &&
    to.length === 3 &&
    from.connections.some(connection => connection === to)
  );
};

export const filterStations = (stations, value) => {
  const valueMatches = station => {
    return (
      station.shortName.toLowerCase().includes(value.toLowerCase()) ||
      station.iata.toLowerCase().includes(value.toLowerCase())
    );
  };

  const filteredStations = stations.filter(station => valueMatches(station));
  return filteredStations ? filteredStations : [];
};
