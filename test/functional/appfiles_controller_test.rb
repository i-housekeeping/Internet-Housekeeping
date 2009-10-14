require 'test_helper'

class AppfilesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:appfiles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create appfile" do
    assert_difference('Appfile.count') do
      post :create, :appfile => { }
    end

    assert_redirected_to appfile_path(assigns(:appfile))
  end

  test "should show appfile" do
    get :show, :id => appfiles(:one).id
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => appfiles(:one).id
    assert_response :success
  end

  test "should update appfile" do
    put :update, :id => appfiles(:one).id, :appfile => { }
    assert_redirected_to appfile_path(assigns(:appfile))
  end

  test "should destroy appfile" do
    assert_difference('Appfile.count', -1) do
      delete :destroy, :id => appfiles(:one).id
    end

    assert_redirected_to appfiles_path
  end
end
