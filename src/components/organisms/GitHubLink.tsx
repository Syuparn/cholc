import { HStack, Link } from "@chakra-ui/react";

function GitHubLink() {
  return (
    <HStack padding="1em">
      <Link
        href="https://github.com/Syuparn/cholc"
        // TODO: replace with `isExternal={true}` after it is supported 
        target="_blank" rel="noopener noreferrer"
      >
        About Cholc (GitHub)
      </Link>
    </HStack>
  )
}

export default GitHubLink
