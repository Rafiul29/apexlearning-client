import { Button } from "@/components/ui/button";

const SocialGoogle = ({ title }: { title: string }) => {
  return (
    <Button variant="outline" type="button">
      {title}
    </Button>
  );
};

export default SocialGoogle;
