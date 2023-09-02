import {
  Card,
  HStack,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { HiExternalLink } from "react-icons/hi";

const Certification = () => {
  const { user } = useSelector((state) => state.user);

  console.log(user);
  return (
    <Fragment>
      <div id="certifications">
        <h2>Certifications</h2>

        <section>
          {user && user.projects ? (
            user.certifications.map((certification, index) => (
              <CertificationCard
                key={index}
                name={certification.name}
                issuingOrganization={certification.org}
                credentialID={certification.id}
                credentialURL={certification.url}    
                image={certification.image.url}
              />
            ))
          ) : (
            <p>No Cretification Yet.</p>
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Certification;

const CertificationCard = ({
  name,
  issuingOrganization,
  credentialURL,
  image,
}) => (
//   <Card
//     direction={{ base: "column", sm: "row" }}
//     overflow="hidden"
//     variant="outline"
//     borderWidth="1px"
//     borderColor="gray.300"
//     borderRadius="lg"
//     p={4}
//     width="48%"
//     height="30%"
//   >
//     <Image
//       objectFit="cover"
//       maxW={{ base: "100%", sm: "200px" }}
//       src={image}
//       h={20}
//       alt={name}
//       mr={{ sm: 4 }}
//     />

//     <Stack>
//       <Heading size="md">{name}</Heading>

//       <Text fontSize="sm" fontWeight="bold" py="2">
//         {issuingOrganization}
//       </Text>

//       <Link href={credentialURL} isExternal fontSize="md">
//         <HStack
//           border="1px"
//           padding="0.56rem"
//           borderRadius="40px"
//           width="-webkit-fit-content"
//           mt={2}
//         >
//           <Text>Show Credential</Text>
//           <HiExternalLink fontSize="lg" />
//         </HStack>
//       </Link>
//     </Stack>
//   </Card>
<Card
  direction={{ base: "column", sm: "row" }}
  overflow="hidden"
  variant="outline"
  borderWidth="1px"
  borderColor="gray.300"
  borderRadius="lg"
  p={4}
  width={{ base: "100%", sm: "48%" }} // Adjusted width for mobile
  minHeight="200px" // Added minHeight to ensure consistent height
  marginY={2} // Added margin for spacing between cards on mobile
>
  <Image
    objectFit="cover"
    maxW={{ base: "100%", sm: "200px" }}
    src={image}
    h={20}
    alt={name}
    mb={{ base: 2, sm: 0 }} // Adjusted margin for spacing on mobile
  />

  <Stack
    flex="1" // Take up remaining space
    justifyContent="space-between" // Add space between elements
    textAlign={{ base: "center", sm: "left" }} // Center text on mobile, left-align on larger screens
  >
    <Heading size="md" paddingLeft={3}>{name}</Heading>

    <Text fontSize="sm" fontWeight="bold" py="2" p={4}>
      {issuingOrganization}
    </Text>

    <Link href={credentialURL} isExternal fontSize="md">
      <HStack
        border="1px"
        padding="0.56rem"
        borderRadius="40px"
        width="-webkit-fit-content"
        mt={2}
        alignSelf="flex-end" // Align to the bottom on mobile
      >
        <Text>Show Credential</Text>
        <HiExternalLink fontSize="lg" />
      </HStack>
    </Link>
  </Stack>
</Card>

);
