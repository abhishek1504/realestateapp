import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";
import { propertyDetailsCommonUI } from "../../components/Property";

function showPhotosIfExists(photos) {
  if (photos && photos.length > 0) {
    return <ImageScrollbar data={photos} />;
  }
  return null;
}

function shouldShowVerified(isVerified) {
  if (isVerified) {
    return <GoVerified />;
  }
  return null;
}

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxWidth="1000px" margin="auto" p="4">
    {showPhotosIfExists(photos)}
    <Box w="full" p="6">
      {propertyDetailsCommonUI(
        isVerified,
        price,
        rentFrequency,
        agency,
        rooms,
        baths,
        area,
        title,
        description,
        true
      )}
      <Flex
        flexWrap="wrap"
        textTransform="uppercase"
        justifyContent="space-between"
      >
        {propertyMetaData("Type", type)}
        {propertyMetaData("Purpose", purpose)}
        {shouldShowFurnishingStatus(furnishingStatus)}
      </Flex>
      {shouldShowAmenities(amenities)}
    </Box>
  </Box>
);

function shouldShowAmenitiesText(amenities) {
  if (amenities.length > 0) {
    return (
      <Text fontSize="2xl" fontWeight="black" marginTop="5">
        Amenities
      </Text>
    );
  }
  return null;
}

function shouldShowAmenities(amenities) {
  return (
    <Box>
      {shouldShowAmenitiesText(amenities)}
      <Flex flexWrap="wrap">
        {amenities.map((item) =>
          item.amenities.map((amenity) => (
            <Text
              key={amenity.text}
              fontWeight="bold"
              color="blue.400"
              fontSize="l"
              p="2"
              bg="gray.200"
              m="1"
              borderRadius="5"
            >
              {amenity.text}
            </Text>
          ))
        )}
      </Flex>
    </Box>
  );
}

function shouldShowFurnishingStatus(furnishingStatus) {
  if (furnishingStatus) {
    return propertyMetaData("Furnishing Status", furnishingStatus);
  }
  return null;
}

function propertyMetaData(key, value) {
  return (
    <Flex
      justifyContent="space-between"
      w="400px"
      borderBottom="1px"
      borderColor="gray.100"
      p="3"
    >
      <Text>{key}</Text>
      <Text fontWeight="bold">{value}</Text>
    </Flex>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetails: data,
    },
  };
}

export default PropertyDetails;
