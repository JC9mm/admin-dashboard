'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from './product';
import { SelectProduct } from '@/lib/db';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export function ProductsTable({
  products: initialProducts,
  offset: initialOffset,
  totalProducts: initialTotalProducts,
  searchParams: initialSearchParams
}: {
  products: SelectProduct[];
  offset: number;
  totalProducts: number;
  searchParams: { q: string; offset: string };
}) {
  let router = useRouter();
  let searchParams = useSearchParams();
  let productsPerPage = 5;

  const [products, setProducts] = useState(initialProducts);
  const [offset, setOffset] = useState(initialOffset);
  const [totalProducts, setTotalProducts] = useState(initialTotalProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      const search = searchParams.get('q') ?? '';
      const offset = searchParams.get('offset') ?? 0;
      const response = await fetch(`/api/products?search=${search}&offset=${offset}`);
      const data = await response.json();
      setProducts(data.products);
      setOffset(data.newOffset);
      setTotalProducts(data.totalProducts);
    };

    fetchProducts();
  }, [searchParams]);

  function prevPage() {
    let params = new URLSearchParams(searchParams.toString());
    params.set('offset', (offset - productsPerPage).toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  function nextPage() {
    let params = new URLSearchParams(searchParams.toString());
    params.set('offset', offset.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
