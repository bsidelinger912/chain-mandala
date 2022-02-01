export type Trait = {
  trait_type: string;
  value: string;
};

export type NFTMetaData = {
  attributes: Trait[];
  name: string;
  description: string;
  image: string;
}
