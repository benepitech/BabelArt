<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\BaseController;

class ProductController extends BaseController
{
    public function getProducts()
    {
        $products = Product::all();
        $message = 'Request Get Product index successfull.';

        return $this->sendResponse([
            'products' => $products,

        ], $message, 201);
    }
 
    public function getProductsByCategory($data)    
    {
        $products = Product::select()->where('category_id', '=' , $data)->get();
        $message = 'Request Get Product index successfull.';
        if (!($products->isEmpty())){
        return $this->sendResponse([
            'products' => $products,

        ], $message, 201);
        } else {
            return $this->sendResponse('not found',401);
        }
    }

    public function getProductsBySeller($data)    
    {
        $products = Product::select()->where('seller_id', '=' , $data)->get();
        $message = 'Request Get Product index successfull.';
        if (!($products->isEmpty())){

            return $this->sendResponse([
                'products' => $products,

            ], $message, 201);
            
        } else {

            return $this->sendResponse('not found',401);
        }
    }

    public function getProduct($id)
    {
        try {
            $product = Product::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Product not found', $e, 400);
        }

        $message = 'Product successfully found';
        return $this->sendResponse([
            'product' => $product,
        ], $message, 201);
    }

    public function createProduct(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'seller_id' => 'required',
            'category_id' => 'required',
        ]);

        if ($validator->fails()) {

            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        if ($image = $request->file('image')) {
            $destinationPath = 'image/';
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $data['image'] = "$profileImage";
        }

        $product = Product::create($data);

        $message = "Product created !";

        return $this->sendResponse($product, $message, 201);
    }

    public function updateProduct(Request $request, $id)
    {
        
        $product = Product::find($id);
        $data = $request->all();

        $validator = Validator::make($data, [

            'name' => 'sometimes',
            'price' => 'sometimes',
            'description' => 'sometimes',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'seller_id' => 'sometimes',
            'category_id' => 'sometimes',
            
        ]);
        
        if ($validator->fails()) {

            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        if (isset($data['name'])) {
            $product->name = $data['name']; }
            
        if (isset($data['price'])) {
            $product->price = $data['price']; }

        if (isset($data['description'])) {
                $product->description = $data['description'];}

        if (isset($data['image'])) {
            if ($image = $request->file('image')) {
                var_dump($image);
                    $destinationPath = 'image/';
                    $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
                    $image->move($destinationPath, $profileImage);
                    $product->image = "$profileImage";
            }
        }

        if (isset($data['seller_id'])) {
            $product->seller_id = $data['seller_id']; }

        if (isset($data['category_id'])) {
            $product->category_id = $data['category_id']; 
        }
            var_dump($product);
        $result = $product->save();

        if ($result) {
            $message = 'The Product has been succesfully updated';
        } else {
            $message = 'We have encounter an error in the updating of the Product';
        }

        return $this->sendResponse($product, $message, 201);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);
        $result = $product->delete();
        if ($result) {
            $message = 'The Product has been succesfully delete';
        } else {
            $message = 'We have encounter an error in the deleting of the Product';
        }
        return $this->sendResponse($product, $message, 201);
    }
}