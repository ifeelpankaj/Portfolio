import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAward, deleteAward, getUser } from "../../Redux/Actions/UserAction";
import { toast } from "react-hot-toast";


const AddCertificate = () => {
  const { isAuthenticated } = useSelector((state) => state.login);
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [org, setIssuingOrganization] = useState("");
  const [id, setCredentialID] = useState("");
  // const [dte, setIssueDate] = useState("");
  const [image, setImage] = useState(null); // Use null as initial state for image
  const [url, setCredentialURL] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

   
    await dispatch(
      addAward(name, org, id, url, image)
    );
    dispatch(getUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    // Ensure that a file was selected before setting the image state
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (loginMessage) {
      toast.success(loginMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [error, message, dispatch, loginMessage]);

  return (
    <Fragment>
      {isAuthenticated ? (
        <>
          <div className="login">
            <div className="loginContainer">
              <form onSubmit={submitHandler} className="loginForm">
                <label htmlFor="certificateName">Name</label>
                <Input
                  type="text"
                  id="certificateName"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />

                <label htmlFor="issuingOrganization">
                  Issuing Organization
                </label>
                <Input
                  type="text"
                  id="issuingOrganization"
                  placeholder="Issuing Organization"
                  value={org}
                  onChange={(e) => setIssuingOrganization(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />

                

                <label htmlFor="credentialID">Credential ID</label>
                <Input
                  type="text"
                  id="credentialID"
                  placeholder="Credential ID"
                  value={id}
                  onChange={(e) => setCredentialID(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />

                <label htmlFor="credentialURL">Credential URL</label>
                <Input
                  type="text"
                  id="credentialURL"
                  placeholder="Credential URL"
                  value={url}
                  onChange={(e) => setCredentialURL(e.target.value)}
                  pr="4.5rem"
                  marginBottom={5}
                />

                <label htmlFor="certificateImage">
                  Upload Certificate Image
                </label>
                <Input
                  type="file"
                  id="certificateImage"
                  onChange={handleImage}
                  accept="image/*"
                  pr="4.5rem"
                  marginBottom={5}
                />

                <Link marginBottom={2} padding={4} to="/">
                  Back
                </Link>

                <Center>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    variant="outline"
                    width={100}
                    isDisabled={loading}
                    isLoading={loading}
                  >
                    Add
                  </Button>
                </Center>
              </form>
            </div>
          </div>

          <Stack spacing={6} direction="row" wrap="wrap">
            {user.certifications ? (
              user.certifications.map((certificate) => (
                <CertificateCard
                  key={certificate._id}
                  certificate={certificate}
                />
              ))
            ) : (
              <Text>No projects available.</Text>
            )}
          </Stack>
        </>
      ) : (
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          align="center"
        >
          Please{" "}
          <Link marginBottom={2} padding={4} to="/login">
            Login
          </Link>{" "}
          to Access this Resource
        </Text>
      )}
    </Fragment>
  );
};

export default AddCertificate;

const CertificateCard = ({ certificate }) => {
  const dispatch = useDispatch();

  const handleDeleteProject = async (id) => {
    await dispatch(deleteAward(id));
    dispatch(getUser());
  };
  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Image
        src={certificate.image.url}
        alt={certificate.name}
        maxWidth="100px" // Adjust the value as needed
      />
      <Text fontSize="xl" fontWeight="semibold">
        {certificate.name}
      </Text>
      <Text>{certificate.skills}</Text>
      <Text>Date: {certificate.issueDate}</Text>
      <Text>
        <a
          href={certificate.credentialURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show Credential
        </a>
      </Text>
      <Button
        colorScheme="red"
        size="sm"
        onClick={() => handleDeleteProject(certificate._id)} // Call delete function here
        mt={2}
      >
        Delete
      </Button>
    </Box>
  );
};
