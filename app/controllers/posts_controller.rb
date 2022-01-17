class PostsController < ApplicationController
  def new
    @post = Post.new
  end

  def index
    @posts = Post.all
  end

  def create
    @post = Post.new(picture: params[:picture])
    @post.save
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy!
  end
end
